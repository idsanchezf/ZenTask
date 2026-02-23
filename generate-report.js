import report from 'multiple-cucumber-html-reporter';

report.generate({
    jsonDir: './cypress/reports/',
    reportPath: './cypress/reports/html/',
    metadata: {
        browser: {
            name: 'chrome',
            version: '120'
        },
        device: 'Local Test Machine',
        platform: {
            name: 'windows',
            version: '11'
        }
    },
    customData: {
        title: 'Run Info',
        data: [
            { label: 'Project', value: 'ZenTask MVP' },
            { label: 'Release', value: '1.0.0' },
            { label: 'Cycle', value: 'B112' }
        ]
    }
});
