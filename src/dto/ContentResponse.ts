export class ContentResponse{
    id: string;
    type: string;
    status: string;
    title: string;
    _expandable: any;
    _links: any;
}

export class AncestorContentResponse{
    id: string;
    type: string;
    status: string;
    title: string;
    _expandable: any;
    _links: any;
    ancestors: ContentResponse[];
}
