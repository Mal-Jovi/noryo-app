# noryo-app

`noryo-app` is a healthcare management application for organizing and managing patients, doctors, appointments, medications, and schedules. It is built to run both in the browser and as a desktop application.

## Demo Data Disclaimer

The bundled demo dataset uses a mix of randomly generated and hand-written sample entries for development, testing, and demonstration. Patient and provider profiles, appointments, and clinical histories are fictional. They are not based on anyone's personal or medical records and are not intended to identify or describe any real person, living or deceased. Any resemblance to an actual person or their circumstances is entirely coincidental.

Medication names and other healthcare terms may refer to real products or conditions. The sample records are for demonstration only and should not be used for clinical care or decision-making.

## Tech Stack

### Frontend
- **Next.js & React**: App Router-based UI built with React and TypeScript.
- **Tailwind CSS**: Utility-first styling.
- **Apollo Client**: GraphQL client for fetching and caching data.
- **Tauri**: Desktop application wrapper.

### Backend
- **Bun**: JavaScript/TypeScript runtime and package manager.
- **Apollo Server & GraphQL**: GraphQL API server with TypeScript code generation (`graphql-codegen`).
- **Prisma**: Database ORM and schema migrations.
- **MariaDB**: Relational database.


## ⚠️ Licensing & Commercial Use Notice

This project is **source-available** but is **NOT open-source**. 

`noryo-app` is licensed under the **Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)** license. 

* 🚫 **No Commercial Use:** Use of this code in any project for-profit, or within a commercial entity, is strictly prohibited.
* 🚫 **No Commercial Modifications:** Modifying this code for deployment in any commercial or revenue-generating project is forbidden.
* 📄 For commercial licensing inquiries or authorized commercial exceptions, please contact the repository owner.

See the full [LICENSE](LICENSE) file for details.
