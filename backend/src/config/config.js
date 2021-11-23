const config = {
  env: "development",
  port: 5000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUrl:
    "mongodb+srv://admin:admin@cluster0.xrkyg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
};

export default config;
