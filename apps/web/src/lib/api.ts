const baseApiUrl = (
    process.env.NEXT_PUBLIC_API_URL ??
    "https://api.dktiv.christopher-nafrere.fr"
).replace(/\/+$/, "");

export function apiUrl(path: string): string {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${baseApiUrl}${normalizedPath}`;
}
