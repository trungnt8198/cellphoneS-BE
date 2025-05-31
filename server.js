require("module-alias/register");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const cors = require("cors");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const router = require("@/routes/api");

const adminRouter = require("@/routes/admin");
const notFoundHandler = require("@/middleware/notFoundHandler");
const handleErrors = require("@/middleware/handleErrors");
const handleSidebar = require("@/middleware/admin/handleSidebar");
const session = require("@/middleware/admin/session");
const shareLocals = require("@/middleware/admin/shareLocals");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(express.static("public"));
app.use(session, shareLocals);
// View engine
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./src/views");

app.set("layout", "./admin/layout/default");
app.use("/admin", handleSidebar, adminRouter);
app.use("/api/v1", router);

app.use(notFoundHandler);
app.use(handleErrors);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
