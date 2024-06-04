import mongoose from "mongoose";

export class Config {
  async start() {
    try {
      // Connect to mondoDb
      await this.dbConnect(process.env.DBURI ?? "");
      console.log("mongodb", process.env.DBURI);
    } catch (error) {
      console.error("OOPS! ", error);
      throw new Error("error");
    }
  }

  private async dbConnect(url: string) {
    try {
      await mongoose.connect(url);
      console.log("Connected to DB");
    } catch (error) {
      console.error("DB Connection Error ", error);
    }
  }

  getBaseUrl(): string {
    return process.env.baseUrl ?? "";
  }
}
