export function parseFileName(fileName) {
    // 1. Strip extension
    const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
    
    // 2. Extract Price 
    const priceMatch = nameWithoutExt.match(/(\d+\.\d+)/);
    const price = priceMatch ? parseFloat(priceMatch[0]) : 0.00;

    // 3. Extract Name
    let name = nameWithoutExt
        .replace(/\(.*?\)/g, '')    // Remove anything in parentheses
        .replace(/SGD|SDG/gi, '')    // Remove currency codes
        .replace(/(\d+\.\d+)/g, '')  // Remove the price number
        .replace(/_/g, ' ')          // Replace underscores with spaces
        .trim();

    // 4. Capitalize (Word by Word)
    name = name.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');

    return {
        original: fileName,
        name: name || "Delicious Item",
        price: price
    };
}
