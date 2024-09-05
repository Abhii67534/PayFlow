// helper.js
import _ from 'lodash';

// Calculate the sum of amounts for each type
export const getSum = (transactions) => {
    if (!Array.isArray(transactions)) {
        console.error('Transactions is not an array:', transactions);
        return {};
    }

    const normalizedTransactions = transactions.map(transaction => ({
        ...transaction,
        amount: parseFloat(transaction.amount)
    }));

    const grouped = _.groupBy(normalizedTransactions, 'type');

    const sums = _.mapValues(grouped, (items) => 
        _.sumBy(items, 'amount')
    );

    return sums;
};

// Calculate labels and percentages
export const getLabels = (transactions) => {
    const amountSum = getSum(transactions);
    const total = _.sum(Object.values(amountSum));

    const percent = _.map(amountSum, (totalAmount, type) => ({
        type,
        totalAmount,
        percent: (100 * totalAmount) / total
    }));

    return percent;
};

// Generate chart configuration
export const chartData = (transactions) => {
    const amountSum = getSum(transactions);
    const total = _.sum(Object.values(amountSum));

    return {
        data: {
            datasets: [{
                label: 'Expense Distribution',
                data: Object.values(amountSum),
                backgroundColor: Object.keys(amountSum).map(type => getColorByType(type)),
                hoverOffset: 4,
                borderRadius: 30,
                spacing: 10,
            }],
            labels: Object.keys(amountSum),
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            const label = tooltipItem.label || '';
                            const value = tooltipItem.raw || 0;
                            const percentage = ((value / total) * 100).toFixed(2);
                            return `${label}: $${value.toFixed(2)} (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '70%',
        }
    };
};

// Example function to get color based on type
const getColorByType = (type) => {
    const colors = {
        Savings: 'rgb(255, 99, 132)',
        Investment: 'rgb(54, 162, 235)',
        Expense: 'rgb(255, 205, 86)',
        // Add more types and colors if needed
    };
    return colors[type] || 'rgb(0, 0, 0)'; // Default color
};
