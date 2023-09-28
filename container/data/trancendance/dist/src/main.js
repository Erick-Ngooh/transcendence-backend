"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.use(cookieParser());
        await app.listen(3000);
    }
    catch (error) {
        console.log("Error in main");
    }
}
bootstrap();
//# sourceMappingURL=main.js.map