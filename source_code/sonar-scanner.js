/* eslint-disable @typescript-eslint/no-var-requires */
const scanner = require('sonarqube-scanner').default;
scanner(
    {
        serverUrl: 'http://10.199.8.23:80',
        token: 'sqp_efc4f5e8dc6a5bf79175a2b43f9b8b1b853533d7',
        options: {
            'sonar.projectName': 'emr-frontend',
            'sonar.sources': 'src',
            'sonar.javascript.lcov.reportPaths': 'coverage\\lcov.info',
            'sonar.exclusions':
                '**\\**.test.ts,**\\**.test.tsx,node_modules\\**\\*, src\\reportWebVitals.ts, src\\setupTests.ts, src\\api\\**\\*,src\\__mocks__\\*',
            'sonar.dependencyCheck.jsonReportPath':
                'owasp/dependency-check-report.json',
            'sonar.dependencyCheck.xmlReportPath':
                'owasp/dependency-check-report.xml',
            'sonar.dependencyCheck.htmlReportPath':
                'owasp/dependency-check-report.html',
            // 'sonar.testExecutionReportPaths': 'coverage\\sonar-report.xml',
            'sonar.projectKey': 'emr-frontend',
            // 'sonar.scm.provider': 'git',
            'sonar.scm.disabled': 'true',
            'sonar.projectVersion': 'dev',
        },
    },
    () => process.exit()
);
