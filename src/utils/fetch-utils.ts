interface Innhold {
    data: {}[];
    env: string[];
}

export const BASE_URL = '/tiltak';

export const isProduction = (): boolean => process.env.NODE_ENV === 'production';

export let env: string[] = [''];
export const setEnv = (item: string[]) => (env = item);

const fetchdata: (url: string) => Promise<Response> = (url) => {
    return fetch(url, { method: 'GET' });
};

export const fetchsanityJSON = async (): Promise<Innhold> => {
    const url = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001';
    const response = await fetchdata(`${url}${BASE_URL}/innhold`);
    await status(response);
    return response.json();
};

function status(response: Response): Promise<Response> {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}
