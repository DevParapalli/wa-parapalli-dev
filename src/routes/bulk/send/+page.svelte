<script lang="ts">
    import {page} from '$app/stores';
    import {goto} from '$app/navigation';
    import { get } from 'svelte/store';
    import {MessagingTemplate, MessagingData, MessagingVars, IND_PHONE_REGEX} from '$lib';
    let message: string = '';

    $: current_index = Number($page.url.searchParams.get('index'));

    $: {
        message = get(MessagingTemplate)
        $MessagingVars.map(
        (var_name, index) => {
            message = message.replaceAll(`{{${var_name}}}`, $MessagingData[current_index][index+1])
        }
    )}
    let phone = ""
    $: {
        const match = $MessagingData[current_index][0].match(IND_PHONE_REGEX);
        if ((match?.length ?? 0 > 0) && match != null) {
            if (match[0].length == 10) {
                phone = '+91' + match[0];
                console.log('Assuming Indian Code');
            } else {
                phone = match[0];
            }
        } else {
            alert('Invalid Phone Number!');
        }
    }

</script>

<div class="flex flex-col items-center justify-center container mx-auto">
    <div class="flex flex-row justify-evenly w-full"><h1 class="text-4xl">{current_index+1}</h1><a href="/bulk" class="btn btn-outline">Go Back</a></div>
    <div class="form-control w-full max-w-lg">
        <label for="message" class="label"><span class="label-text">Rendered Message</span></label>
        <textarea
            bind:value={message}
            id="message"
            name="message"
            class="textarea textarea-bordered h-36"
        />
    </div>
    <div class="form-control w-full max-w-lg">
        <label for="phone" class="label"><span class="label-text">Phone Number</span></label>
        <input
            bind:value={phone}
            id="phone"
            name="phone"
            class="input input-lg w-full valid:input-primary invalid:input-error"
            placeholder="Phone Number"
        />
    </div>

    <div class="w-full max-w-lg pt-8 join join-horizontal">
        <button
            on:click={() => {
                if (current_index > 0) {
                    goto(`/bulk/send?index=${current_index - 1}`);
                } else {
                    goto('/bulk');
                }
            }}
            class="btn btn-accent join-item ml-auto btn-lg"
            disabled={current_index <= 0}
        >
            PREV
        </button>
        <button
            on:click={() => {
                goto(`whatsapp://send/?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(message)}`)
            }}
            class="btn btn-primary join-item btn-lg"
        >
            SEND
        </button>
        <button
            on:click={() => {
                if (current_index < $MessagingData.length - 1) {
                    goto(`/bulk/send?index=${current_index + 1}`);
                } else {
                    goto('/bulk');
                }
            }}
            class="btn btn-accent join-item mr-auto btn-lg"
            disabled={current_index >= $MessagingData.length - 1}
        >
            NEXT
        </button>
    </div>
</div>