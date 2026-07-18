import { join } from "node:path";

import { describe, expect, it } from "vitest";

import type { ToolPackConfig } from "../src/config.js";
import { resolveMacInstallIdentity } from "../src/mac/identity.js";
import { resolveMacPaths } from "../src/mac/paths.js";

function makeConfig(root: string, namespace: string): ToolPackConfig {
  return {
    containerized: false,
    electronBuilderCliPath: "/x/electron-builder/cli.js",
    electronDistPath: "/x/electron/dist",
    electronVersion: "41.3.0",
    macCompression: "normal",
    namespace,
    platform: "mac",
    portable: true,
    removeData: false,
    removeLogs: false,
    removeProductUserData: false,
    removeSidecars: false,
    requireVelaCli: false,
    roots: {
      output: {
        appBuilderRoot: join(root, ".tmp", "tools-pack", "out", "mac", "namespaces", namespace, "builder"),
        namespaceRoot: join(root, ".tmp", "tools-pack", "out", "mac", "namespaces", namespace),
        platformRoot: join(root, ".tmp", "tools-pack", "out", "mac"),
        root: join(root, ".tmp", "tools-pack", "out"),
      },
      runtime: {
        namespaceBaseRoot: join(root, ".tmp", "tools-pack", "runtime", "mac", "namespaces"),
        namespaceRoot: join(root, ".tmp", "tools-pack", "runtime", "mac", "namespaces", namespace),
      },
      cacheRoot: join(root, ".tmp", "tools-pack", "cache"),
      toolPackRoot: join(root, ".tmp", "tools-pack"),
    },
    signed: false,
    silent: true,
    to: "dmg",
    webOutputMode: "standalone",
    workspaceRoot: root,
  };
}

describe("resolveMacInstallIdentity", () => {
  it("keeps stable builds on the canonical mac identity", () => {
    expect(resolveMacInstallIdentity(makeConfig("/work", "release-stable"))).toMatchObject({
      appId: "io.open-design.desktop",
      installerTitle: "Kinected Design",
      productName: "Kinected Design",
      publicAppBundleName: "Kinected Design.app",
      systemAppBundleName: "Kinected Design.app",
    });
  });

  it("uses first-class beta app identity for beta release namespaces", () => {
    const config = makeConfig("/work", "release-beta");

    expect(resolveMacInstallIdentity(config)).toEqual({
      appId: "io.open-design.desktop.beta",
      executableName: "Kinected Design Beta",
      installerTitle: "Kinected Design Beta",
      productName: "Kinected Design Beta",
      publicAppBundleName: "Kinected Design Beta.app",
      systemAppBundleName: "Kinected Design Beta.app",
    });
    expect(resolveMacPaths(config).appPath).toMatch(/Kinected Design Beta\.app$/);
  });

  it("uses first-class preview app identity for preview release namespaces", () => {
    const config = makeConfig("/work", "release-preview");

    expect(resolveMacInstallIdentity(config)).toEqual({
      appId: "io.open-design.desktop.preview",
      executableName: "Kinected Design Preview",
      installerTitle: "Kinected Design Preview",
      productName: "Kinected Design Preview",
      publicAppBundleName: "Kinected Design Preview.app",
      systemAppBundleName: "Kinected Design Preview.app",
    });
    expect(resolveMacPaths(config).appPath).toMatch(/Kinected Design Preview\.app$/);
  });

  it("uses first-class prerelease app identity for prerelease release versions and namespaces", () => {
    const prereleaseVersionConfig = {
      ...makeConfig("/work", "release-stable"),
      appVersion: "0.8.0-prerelease.2",
    };
    const prereleaseNamespaceConfig = makeConfig("/work", "release-prerelease");

    expect(resolveMacInstallIdentity(prereleaseVersionConfig)).toEqual({
      appId: "io.open-design.desktop.prerelease",
      executableName: "Kinected Design Prerelease",
      installerTitle: "Kinected Design Prerelease",
      productName: "Kinected Design Prerelease",
      publicAppBundleName: "Kinected Design Prerelease.app",
      systemAppBundleName: "Kinected Design Prerelease.app",
    });
    expect(resolveMacPaths(prereleaseVersionConfig).appPath).toMatch(/Kinected Design Prerelease\.app$/);
    expect(resolveMacInstallIdentity(prereleaseNamespaceConfig)).toMatchObject({
      productName: "Kinected Design Prerelease",
      publicAppBundleName: "Kinected Design Prerelease.app",
    });
  });
});
