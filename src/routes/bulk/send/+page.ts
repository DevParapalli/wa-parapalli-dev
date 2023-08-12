import {redirect} from '@sveltejs/kit';
import { MessagingData } from '$lib';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load: PageLoad = ({url}) => {
    console.log(url.searchParams.get('index'), get(MessagingData).length);
    if (Number(url.searchParams.get('index')) >= get(MessagingData).length) {
        throw redirect(307, '/bulk');
    }
}