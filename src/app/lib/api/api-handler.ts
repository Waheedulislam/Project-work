import { FormData } from "./api-types";

class ApiHandler {
  private readonly API: string;

  constructor(api: string | undefined) {
    if (!api) {
      throw new Error("API variable must be provided");
    }
    this.API = api;
  }

  async subscribe(email: string) {
    const response = await fetch(this.API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });
    return response;
  }

  async sendMessage(formData: FormData) {
    const response = await fetch(this.API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });
    return response;
  }
}

export const apiHandler = new ApiHandler(process.env.API);
