import api, {APIResponse, Route, route} from "@forge/api";
import {RequestInit} from "node-fetch";
import config from "../config";
import {AncestorContentResponse} from "./dto/ContentResponse";

export async function run(event): Promise<void> {
    const headers: HeadersInit = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    const id: string = event.content.id;

    const ancestorResponse: APIResponse = await safeRequest(route`/wiki/rest/api/content/${id}?expand=ancestors`, {
        headers
    });
    const ancestorData: AncestorContentResponse = await ancestorResponse.json();

    const extendLabels: string[] = [];
    ancestorData.ancestors.forEach((ancestor: any) => {
        const ancestorLabels: string[] = config.labelMaps[ancestor.id];
        if (ancestorLabels) {
            extendLabels.push(...ancestorLabels);
        }
    });
    if (extendLabels.length > 0) {
        let labels: string = extendLabels.map(label => (JSON.stringify({prefix: 'global', name: label}))).join(",");
        let body: string = `[${labels}]`;
        await safeRequest(route`/wiki/rest/api/content/${id}/labels`, {
            method: 'POST',
            headers,
            body
        });
    }

    const allLabels: string[] = [].concat(...Object.values(config.labelMaps));
    const removedLabels: string[] = allLabels.filter((v) => extendLabels.indexOf(v) < 0);
    for (const removedLabel of removedLabels) {
        await safeRequest(route`/wiki/rest/api/content/${id}/label/${removedLabel}`, {
            method: 'DELETE',
            headers,
        });
    }
}

export async function safeRequest(url: Route, init?: RequestInit): Promise<APIResponse> {
    try {
        return await api.asApp().requestConfluence(url, init);
    } catch (e) {
        console.log(e);
        return null;
    }
}
