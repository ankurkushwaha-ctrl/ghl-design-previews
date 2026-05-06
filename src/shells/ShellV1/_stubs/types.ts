/*
 * Permissive type for sidebar nav items.
 *
 * Upstream defines this as `V2RouteConfig` (in src/util/navigation.ts) and
 * `SideBarItemConfig` (in src/config/navigation/baseSideBarItemConfig.ts).
 * For the preview we collapse them into a single permissive shape so the
 * vendored templates (UIMenuItems.vue, SideBar.vue) compile.
 *
 * When dev lifts back into spm-ts, replace this with the canonical types.
 */

export interface NavIcon {
  value: {
    color: string;
    fontFamily: string;
    name: string;
    unicode: string;
  };
  svg?: string;
}

export interface NavRoute {
  name: string;
  params?: string[] | Record<string, unknown>;
  default_params?: Record<string, unknown>;
  id?: string;
}

export interface NavBadge {
  enable?: boolean;
  title?: string;
  visibleTo?: Array<{ type?: string; role?: string }>;
}

// Permissive shapes — upstream's templates read these fields without narrow
// type checks (upstream doesn't run vue-tsc). We loosen the types so the
// vendored templates compile without per-line casts.
export interface V2RouteConfig {
  name: string;
  enabled?: boolean;
  items?: V2RouteConfig[];
  type?: string;
  meta: string;
  tooltip?: string | null;
  permissions?: { all: string[]; any: string[] };
  userScopes?: { all: string[]; any: string[] };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
  children?: V2RouteConfig[];
  route?: NavRoute;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  badge?: any;
  hide?: boolean;
  linkId?: string;
  adminOnly?: boolean;
  id?: string;
}

export type SideBarItemConfig = V2RouteConfig;
