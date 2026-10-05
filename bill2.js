// Billing system
const prompt = require('prompt-sync')({ sigint: true });

function userPrompt() {
    const customerName = prompt('Please enter your name: ').trim();
    const customerType = prompt('Please enter your customer type (Regular/Premium): ').trim();
    const billAmount = parseFloat(prompt('Please enter the bill amount: '));
    const option = prompt('Please enter the payment method (cash, card, UPI): ').trim();

    return { customerName, customerType, billAmount, option };
}

function gstCalculation(amount) {
    return (amount * 18) / 100;
}

function paymentMethod(option) {
    switch (option.toLowerCase()) {
        case 'cash':
            return 'Cash';
            
        case 'card':
            return 'Card';
        case 'upi':
            return 'UPI';
        default:
            return 'Invalid payment method choice.';
    }
}

function regularCustomerDiscount(billAmount) {
    if (billAmount <= 5000) {
        return billAmount * 0.05;
    }
    return billAmount * 0.10;
}

function premiumCustomerDiscount(billAmount) {
    if (billAmount < 5000) {
        return billAmount * 0.20;
    }
    return billAmount * 0.10;
}

function billGeneration(customerName, billAmount, customerType, option) {
    const normalizedType = customerType.trim().toLowerCase();
    const normalizedOption = option.trim().toLowerCase();

    let discount = 0;

    if (normalizedType === 'regular') {
        discount = regularCustomerDiscount(billAmount);
    } else if (normalizedType === 'premium') {
        discount = premiumCustomerDiscount(billAmount);
    } else {
        console.log('Invalid customer type.');
        return;
    }

    const subtotalAfterDiscount = billAmount - discount;
    const gst = gstCalculation(subtotalAfterDiscount.toFixed(2));
    const totalBillAmount = subtotalAfterDiscount + gst;

    console.log('===================================');
    console.log('Greetings!!! ' + customerName);
    //console.log('Customer Name: ' + customerName);
    console.log('Customer Type: ' + customerType);
    console.log('Bill Amount: ' + billAmount);
    console.log('Discount: ' + discount);
    console.log('Subtotal after discount: ' + subtotalAfterDiscount);
    console.log('GST: ' + gst);
    console.log('Total Bill Amount: ' + totalBillAmount.toFixed(2));
    console.log('Payment Method: ' + paymentMethod(normalizedOption));
    console.log('===================================');
    console.log('Thank you for Shopping with us!');
}

const { customerName, billAmount, customerType, option } = userPrompt();
billGeneration(customerName, billAmount, customerType, option);
