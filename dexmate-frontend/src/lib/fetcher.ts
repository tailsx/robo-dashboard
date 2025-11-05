export type FetcherRequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export class Fetcher {
  private baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(path: string, options: FetcherRequestOptions = {}): Promise<T> {
    const { body, headers = {}, ...rest } = options;

    const config: RequestInit = {
      ...rest,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      credentials: "include",
    };

    if (body !== undefined) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${this.baseUrl}${path}`, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      const res = await response.json();

      if (res.success) {
        return res.data as T;
      }
    }

    return (await response.text()) as T;
  }

  async get<T>(path: string, options?: FetcherRequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: "GET" });
  }

  async post<T>(path: string, body?: unknown, options?: FetcherRequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: "POST", body });
  }

  async put<T>(path: string, body?: unknown, options?: FetcherRequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: "PUT", body });
  }

  async patch<T>(path: string, body?: unknown, options?: FetcherRequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: "PATCH", body });
  }

  async delete<T>(path: string, options?: FetcherRequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: "DELETE" });
  }
}
