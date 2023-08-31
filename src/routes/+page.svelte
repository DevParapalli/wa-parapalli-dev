<!-- Page contains textbox, message box, a submit button and a bulk button -->
<script lang="ts">
    import { IND_PHONE_REGEX } from '$lib';
    import { goto } from '$app/navigation';
    let tel = '';
    let message = '';

    const submit = () => {
        const match = tel.match(IND_PHONE_REGEX);
        let phone = '';
        if ((match?.length ?? 0 > 0) && match != null) {
            if (match[0].length == 10) {
                phone = '+91' + match[0];
                console.log('Assuming Indian Code');
            } else {
                phone = match[0];
            }
            goto(`https://api.whatsapp.com/send?phone=${phone}&text=${message}`);
        } else {
            alert('Invalid Phone Number!');
        }
    };
</script>

<div class="flex flex-col items-center justify-evenly container gap-4 mx-auto">
    <div class="form-control w-full max-w-lg">
        <label for="phone" class="label"><span class="label-text">Phone Number</span></label>
        <input
            on:submit={submit}
            bind:value={tel}
            name="phone"
            pattern={`(\\+91|\\+91-|0)?[6789]\\d{9}`}
            class="input input-lg w-full valid:input-primary invalid:input-error"
        />
    </div>
    <div class="form-control w-full max-w-lg">
        <label for="message" class="label"><span class="label-text">Message</span></label>
        <textarea
            bind:value={message}
            class="textarea textarea-bordered textarea-primary"
            placeholder="Message"
        />
    </div>
    <div class="join flex flex-row w-full max-w-lg">
        <button on:click={submit} class="btn btn-primary join-item flex-grow">Submit</button>
        <a href="bulk" class="btn btn-ghost join-item flex-grow">Bulk message</a>
    </div>
</div>
