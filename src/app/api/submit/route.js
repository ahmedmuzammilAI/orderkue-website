import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import tesseract from 'node-tesseract-ocr';
import sharp from 'sharp';
import { createObjectCsvWriter } from 'csv-writer';

// Create directories
const uploadDir = path.join(process.cwd(), 'uploads');
const dataDir = path.join(process.cwd(), 'data');

// Ensure directories exist
async function ensureDirectories() {
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true });
  }
}

// Parse menu text to extract items and prices
function parseMenuItems(text) {
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  const menuItems = [];
  
  const priceRegex = /(\$|Rs\.?|₹|USD|EUR|£)?\s*(\d+(?:[.,]\d{2})?)\s*(\$|Rs\.?|₹|USD|EUR|£)?/g;
  
  lines.forEach(line => {
    const matches = line.match(priceRegex);
    if (matches && matches.length > 0) {
      const priceMatch = matches[matches.length - 1];
      const price = priceMatch.replace(/[^\d.,]/g, '');
      
      const itemName = line.replace(priceMatch, '').trim()
        .replace(/^[-•*]\s*/, '')
        .replace(/\s+/g, ' ');
      
      if (itemName && price) {
        menuItems.push({
          item: itemName,
          price: price
        });
      }
    }
  });
  
  return menuItems;
}

// Format menu items for CSV
function formatMenuForCSV(menuItems) {
  if (!menuItems || menuItems.length === 0) return 'No items parsed';
  return menuItems.map(item => `${item.item}: ${item.price}`).join(' | ');
}

// OCR Function
async function extractTextFromImage(imagePath) {
  try {
    console.log('🔍 Starting OCR on image:', imagePath);
    
    const optimizedPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '-optimized.png');
    await sharp(imagePath)
      .greyscale()
      .normalize()
      .resize({ width: 2000, withoutEnlargement: true })
      .toFile(optimizedPath);

    const config = {
      lang: 'eng',
      oem: 1,
      psm: 3,
    };

    const text = await tesseract.recognize(optimizedPath, config);
    
    console.log('✅ OCR Complete! Extracted text length:', text.length);
    return text.trim();
  } catch (error) {
    console.error('❌ OCR Error:', error.message);
    return '';
  }
}

// Generate unique submission ID
function generateSubmissionId() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `SUB-${timestamp}-${random}`;
}

export async function POST(request) {
  try {
    await ensureDirectories();
    
    const formData = await request.formData();
    
    const whatsappNumber = formData.get('whatsappNumber');
    const businessName = formData.get('businessName');
    const catalogText = formData.get('catalogText');
    const operatingHours = formData.get('operatingHours');
    const deliveryRules = formData.get('deliveryRules');
    const pickupRules = formData.get('pickupRules');
    const additionalNotes = formData.get('additionalNotes');
    const catalogFile = formData.get('catalogFile');

    let extractedText = '';
    let fileName = 'None';
    let fileType = 'None';
    let menuItems = [];
    let savedFilePath = '';

    // Handle file upload
    if (catalogFile && catalogFile.size > 0) {
      const bytes = await catalogFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      fileName = catalogFile.name;
      const safeFileName = uniqueSuffix + '-' + fileName;
      savedFilePath = path.join(uploadDir, safeFileName);
      
      await writeFile(savedFilePath, buffer);
      
      fileType = path.extname(fileName).toUpperCase().replace('.', '');
      
      // If it's an image, run OCR
      const imageTypes = ['.jpg', '.jpeg', '.png'];
      const ext = path.extname(fileName).toLowerCase();
      
      if (imageTypes.includes(ext)) {
        console.log('📸 Image detected, running OCR...');
        extractedText = await extractTextFromImage(savedFilePath);
        
        if (extractedText) {
          menuItems = parseMenuItems(extractedText);
          console.log(`📋 Parsed ${menuItems.length} menu items`);
        }
      } else if (ext === '.pdf') {
        extractedText = 'PDF uploaded - Manual review required';
      } else if (ext === '.csv') {
        extractedText = 'CSV uploaded - Will be processed separately';
      }
    }

    // Parse manual text entry if provided
    if (catalogText && catalogText.trim()) {
      const manualItems = parseMenuItems(catalogText);
      if (manualItems.length > 0 && menuItems.length === 0) {
        menuItems = manualItems;
      }
    }

    // Generate unique ID
    const submissionId = generateSubmissionId();
    const now = new Date();

    // Prepare CSV data
    const submissionData = {
      submissionId: submissionId,
      submissionDate: now.toLocaleDateString('en-US'),
      submissionTime: now.toLocaleTimeString('en-US'),
      businessName: businessName || 'Not Provided',
      whatsappNumber: whatsappNumber || 'Not Provided',
      uploadedFileName: fileName,
      fileType: fileType,
      menuItemsParsed: formatMenuForCSV(menuItems),
      rawExtractedText: extractedText ? extractedText.substring(0, 500) : 'None',
      manualMenuText: catalogText || 'None',
      operatingHours: operatingHours || 'Not Provided',
      deliveryRules: deliveryRules || 'Not Specified',
      pickupRules: pickupRules || 'Not Specified',
      additionalNotes: additionalNotes || 'None',
      processingStatus: menuItems.length > 0 ? `${menuItems.length} items parsed` : 'No items parsed'
    };

    // Write to CSV
    const csvPath = path.join(dataDir, 'submissions.csv');
    const csvWriter = createObjectCsvWriter({
      path: csvPath,
      header: [
        { id: 'submissionId', title: 'SUBMISSION_ID' },
        { id: 'submissionDate', title: 'SUBMISSION_DATE' },
        { id: 'submissionTime', title: 'SUBMISSION_TIME' },
        { id: 'businessName', title: 'BUSINESS_NAME' },
        { id: 'whatsappNumber', title: 'WHATSAPP_NUMBER' },
        { id: 'uploadedFileName', title: 'UPLOADED_FILE_NAME' },
        { id: 'fileType', title: 'FILE_TYPE' },
        { id: 'menuItemsParsed', title: 'MENU_ITEMS_WITH_PRICES' },
        { id: 'rawExtractedText', title: 'RAW_OCR_TEXT' },
        { id: 'manualMenuText', title: 'MANUAL_MENU_ENTRY' },
        { id: 'operatingHours', title: 'OPERATING_HOURS' },
        { id: 'deliveryRules', title: 'DELIVERY_RULES' },
        { id: 'pickupRules', title: 'PICKUP_RULES' },
        { id: 'additionalNotes', title: 'ADDITIONAL_NOTES' },
        { id: 'processingStatus', title: 'PROCESSING_STATUS' }
      ],
      append: true
    });

    await csvWriter.writeRecords([submissionData]);

    console.log('✅ Submission saved:', submissionData.submissionId);
    console.log(`   📊 Menu items: ${menuItems.length}`);

    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully!',
      data: {
        submissionId: submissionData.submissionId,
        timestamp: now.toISOString(),
        fileName: fileName,
        menuItemsFound: menuItems.length,
        menuItems: menuItems.slice(0, 5),
        ocrCompleted: extractedText ? true : false
      }
    });

  } catch (error) {
    console.error('❌ Error processing submission:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to process submission',
      error: error.message
    }, { status: 500 });
  }
}