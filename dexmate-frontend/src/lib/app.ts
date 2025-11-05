import { config } from "@/lib/config";
import { Fetcher } from "./fetcher";

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

export type RobotDetail = {
  id: string;
  serial_number: string;
  name: string;
  ownerId: string;
  ownerType: "user" | "group";
};

type UserRobotSetting = {
  json: Record<string, string>;
};
type UserRobotSettingResponse = {
  settings: string;
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

  async getRobots() {
    const res = await this.fetcher.get<RobotDetail[]>("/robots");
    return res;
  }

  async getRobot(robotId: string) {
    const res = await this.fetcher.get<RobotDetail>(`/robots/${robotId}`);

    return res;
  }

  async getUserRobotSetting(robotId: string): Promise<UserRobotSetting> {
    const res = await this.fetcher.get<UserRobotSettingResponse>(`/robots/${robotId}/settings/user`);

    return {
      json: JSON.parse(res.settings),
    };
  }

  async createUserRobotSetting(robotId: string, json: Record<string, string>): Promise<void> {
    const res = this.fetcher.post<void>(`/robots/${robotId}/settings/user`, json);

    return res;
  }
}

console.log(config);
const appClient = new AppClient({ baseUrl: config.BASE_URL });

export { appClient };
