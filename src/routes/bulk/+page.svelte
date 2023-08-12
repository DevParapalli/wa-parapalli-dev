<!-- For Bulk Templated Messaging, in case of custom message to each number, just have 1 var, and setup that var in the csv/json -->

<script lang="ts">
    import { goto } from '$app/navigation';
    import { MessagingTemplate, MessagingVars, MessagingData } from '$lib';
    let files: FileList | null;

    const setup = () => {
        if (files) {
            // File contains mobile numbers, and numbers is empty
            // Fill the numbers box with the numbers from the file
            const file = files[0];
            const reader = new FileReader();
            reader.onload = () => {
                const text = reader.result as string;
                // split headers, to get data
                const header = text.split('\n')[0];
                const h_parts = header.split(',').map((part) => part.trim());

                $MessagingVars = h_parts.slice(1).map((part) => part.toLowerCase().trim());
                const lines = text.split('\n').slice(1); // Skip header
                $MessagingData = lines.map((line) => line.split(',').map((part) => part.trim()));
            };
            reader.readAsText(file);

            console.log($MessagingTemplate, $MessagingVars, $MessagingData);
        }
    };
</script>

<div class="mx-auto container flex flex-col items-center justify-center">
    <div class="form-control mb-8 w-full max-w-lg">
        <label for="message-template" class="label">
            <span class="label-text">Message</span>
        </label>
        <textarea
            bind:value={$MessagingTemplate}
            id="message-template"
            name="message-template"
            class="textarea textarea-bordered h-36"
            placeholder="Message"
        />
    </div>

    <input
        bind:files
        type="file"
        accept="text/csv"
        class="file-input file-input-bordered w-full max-w-md mb-4"
    />
    {#if files?.length ?? 0 > 0}
        <button on:click={setup} class="btn btn-primary w-full max-w-sm">SETUP</button>
    {/if}

    {#if $MessagingVars.length > 0}
        <div class="pt-4">
            Messaging Variables in CSV: {#each $MessagingVars as _var}
                <span class="badge badge-outline badge-primary mr-2">{_var}</span>
            {/each}
        </div>
    {/if}
    {#if $MessagingData.length > 0}
        <div class="pt-4">
            Phone Numbers in CSV: {$MessagingData.length}
        </div>
        {#if $MessagingTemplate.length > 0 && $MessagingVars.length > 0}
            <div class="container w-full max-w-md form-control pt-4">
                <button
                    on:click={() => {
                        setup();
                        goto('/bulk/send?index=0');
                    }}
                    class="btn btn-primary btn-lg">SEND</button
                >
            </div>
        {/if}
    {/if}

    <div class="flex flex-col w-full max-w-xl">
        <h1 class="text-lg">Guidelines</h1>
        <ul class="list-disc list-inside">
            <li>Best used on a PC with WA installed.</li>
            <li>Upload a CSV file with the first row as the headers</li>
            <li>Each row should contain a phone number in the first column</li>
            <li>Each row should contain the variables in the headers</li>
        </ul>
    </div>
</div>
