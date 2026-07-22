export const getPublicAssetUrl = (assetPath: string) => {
  if (!assetPath) return assetPath;

  if (
    assetPath.startsWith("http://") ||
    assetPath.startsWith("https://") ||
    assetPath.startsWith("mailto:") ||
    assetPath.startsWith("data:") ||
    assetPath.startsWith("#")
  ) {
    return assetPath;
  }

  const base = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
  const normalizedPath = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;

  if (base && normalizedPath.startsWith(`${base}/`)) {
    return normalizedPath;
  }

  if (base === "") {
    return normalizedPath;
  }

  return `${base}${normalizedPath}`;
};
