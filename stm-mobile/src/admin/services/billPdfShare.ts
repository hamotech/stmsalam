import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { generateBillHTML, type OrderBillInput } from '@/src/utils/generateCustomerBill';

/**
 * Renders bill HTML to PDF and opens the system share sheet (AirDrop, Drive, Files, etc.).
 */
export async function shareOrderBillPdf(order: OrderBillInput): Promise<void> {
  const html = generateBillHTML(order);
  const { uri } = await Print.printToFileAsync({ html });

  const available = await Sharing.isAvailableAsync();
  if (!available) {
    throw new Error('Sharing is not available on this device.');
  }

  await Sharing.shareAsync(uri, {
    mimeType: 'application/pdf',
    dialogTitle: 'Share customer bill',
    UTI: 'com.adobe.pdf',
  });
}
