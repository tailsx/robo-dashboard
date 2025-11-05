import { config } from "@/lib/config";
import { Fetcher } from "./fetcher";

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

type AppClientConfig = {
  baseUrl: string;
};

type CreateRobotData = {
  serial_number: string;
  name: string;
  ownerId: string;
  ownerType: "user" | "group";
};

type CreateRobotResponse = {
  id: string;
};

class AppClient {
  private fetcher: Fetcher;

  constructor(config: AppClientConfig) {
    this.fetcher = new Fetcher(config.baseUrl);
  }

  async createRobot(data: CreateRobotData): Promise<CreateRobotResponse> {
    const res = await this.fetcher.post<CreateRobotResponse>("/robots", data);
    console.log("Created robot with ID:", res.id);

    return res;
  }
}

console.log(config);
const appClient = new AppClient({ baseUrl: config.BASE_URL });

export { appClient };
