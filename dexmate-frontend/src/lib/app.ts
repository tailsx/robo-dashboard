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
  groupId: string | null | undefined;
};

export type GroupMember = User & {
  role: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};
type UserRobotSetting = {
  json: Record<string, string>;
};
type UserRobotSettingResponse = {
  settings: string;
};

export type GroupDetailFull = {};

class AppClient {
  private fetcher: Fetcher;

  constructor(config: AppClientConfig) {
    this.fetcher = new Fetcher(config.baseUrl);
  }

  /** Robots  */
  async createRobot(data: CreateRobotData): Promise<CreateRobotResponse> {
    const res = await this.fetcher.post<CreateRobotResponse>("/robots", data);
    console.log("Created robot with ID:", res.id);

    return res;
  }

  async deleteRobot(robotId: string): Promise<void> {
    const res = await this.fetcher.delete<void>(`/robots/${robotId}`);
    console.log("Deleted robot with ID:", robotId);
    return res;
  }

  async getRobots(limit: number = 100) {
    const res = await this.fetcher.get<RobotDetail[]>(`/robots?limit=${limit}`);

    if (limit) {
      return res.slice(0, limit);
    }
    return res;
  }

  async getRobot(robotId: string) {
    const res = await this.fetcher.get<RobotDetail>(`/robots/${robotId}`);

    return res;
  }

  async assignRobotToGroup(robotId: string, groupId: string): Promise<void> {
    const res = await this.fetcher.post(`/groups/${groupId}/robots`, { robotId });
  }

  async getUserRobotSetting(robotId: string): Promise<UserRobotSetting | null> {
    const res = await this.fetcher.get<UserRobotSettingResponse>(`/robots/${robotId}/settings/user`);

    if (!res) {
      return null;
    }

    return {
      json: JSON.parse(res.settings),
    };
  }

  async createUserRobotSetting(robotId: string, json: Record<string, string>): Promise<void> {
    const res = await this.fetcher.post<void>(`/robots/${robotId}/settings/user`, json);

    return res;
  }

  // Groups
  async getGroupDetail(groupId: string): Promise<GroupDetailFull> {
    const res = await this.fetcher.get<GroupDetailFull>(`/groups/${groupId}`);

    return res;
  }

  async getGroupsWithRole(): Promise<GroupDetailFull[]> {
    const res = await this.fetcher.get<GroupDetailFull[]>(`/groups`);

    return res;
  }

  async getGroupMembers(groupId: string) {
    const res = await this.fetcher.get(`/groups/${groupId}/users`);
    return res;
  }

  async addUserToGroup(email: string, groupId: string): Promise<GroupMember> {
    const res = await this.fetcher.post<GroupMember>(`/groups/${groupId}/users`, { email });

    return res;
  }

  async removeUserFromGroup(userId: string, groupId: string) {
    const res = await this.fetcher.delete(`/groups/${groupId}/users/${userId}`);
    console.log(res);
    return res;
  }
}

console.log(config);
const appClient = new AppClient({ baseUrl: config.BASE_URL });

export { appClient };
