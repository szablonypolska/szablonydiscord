export enum BuilderProcessStatus {
  WAITING = 'WAITING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum BuilderStageType {
  ANALYSIS = 'ANALYSIS',
  AUTHENTICATION = 'AUTHENTICATION',
  CONFIGURE_SERVER = 'CONFIGURE_SERVER',
  ROLES = 'ROLES_CREATE',
  CATEGORY = 'CATEGORIES_CREATE',
  CHANNEL = 'CHANNELS_CREATE',
}

export type BuilderWebsocketType =
  | 'status_updated'
  | 'code_updated'
  | 'analysis_completed'
  | 'roles_created'
  | 'categories_created'
  | 'channels_created'
  | 'materials_updated';

export interface Builder {
  sessionId: string;
  templateCode?: string | null;
  templateUrl?: string | null;
  userId: string;
  title?: string | null;
  description?: string | null;

  sourceTemplate: string | null;
  user: User;
  builderProcess?: BuilderProcess | null;
  materials?: Materials | null;
  metrics?: BuilderMetrics | null;
}

export interface User {
  userId: string;
  name: string;
  email: string;
  image?: string | null;
  role?: string | null;
}

export interface Materials {
  id: number;
  sessionId: string;
  rules: string;
  tariff: string;
  privacyPolicy: string;
  faq: string;
  builder: Builder;
}

export interface BuilderMetrics {
  id: number;
  sessionId: string;
  totalCategories: number;
  totalChannels: number;
  totalRoles: number;
}

export interface BuilderProcess {
  id: number;
  sessionId: string;
  builder: Builder;
  overallStatus: BuilderProcessStatus;
  startedAt: Date;
  finishedAt?: Date | null;
  stages: BuilderStage[];
}

export interface BuilderStage {
  id: number;
  processId: number;
  type: BuilderStageType;
  status: BuilderProcessStatus;
  hasError: boolean;
  code: string;
  builderProcess: BuilderProcess;
  startedAt?: Date;
  finishedAt?: Date | null;
  category?: CategoryStage | null;
  channel?: ChannelStage | null;
  role?: RoleStage | null;
}

export interface CategoryStage {
  id: number;
  builderStageId: number;
  categories: Category[];
  builderStage: BuilderStage;
}

export interface ChannelStage {
  id: number;
  builderStageId: number;
  channels: Channel[];
  builderStage: BuilderStage;
}

export interface RoleStage {
  id: number;
  builderStageId: number;
  roles: Role[];
  builderStage: BuilderStage;
}

export interface Category {
  id: string;
  stageId: number;
  name: string;
  type: number;
  parentId: string;
  position: number;
  private: boolean;
}

export interface Channel {
  id: string;
  stageId: number;
  name: string;
  type: number;
  parentId: string;
  position: number;
  private: boolean;
}

export interface Role {
  id: number;
  stageId: number;
  name: string;
  color: string;
  roleStage: RoleStage;
}
