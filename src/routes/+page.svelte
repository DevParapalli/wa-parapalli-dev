<!-- Page contains textbox, message box, a submit button and a bulk button -->
<script>
    import {IND_PHONE_REGEX} from "$lib"
    for (const match of "87938546974".matchAll(IND_PHONE_REGEX)) {
        if (match.groups) console.log(match.groups.tel);
    }
</script>

<div class="flex flex-col items-center justify-evenly container gap-4 mx-auto ">
    <div class="form-control w-full  max-w-lg">
        <label for="phone" class="label"><span class="label-text">Phone Number</span></label>
        <input name="phone" pattern="{`(\\+91|\\+91-|0)?[6789]\\d{9}`}"  class="input input-lg w-full valid:input-primary invalid:input-error"/>
    </div>
    <div class="form-control w-full  max-w-lg">
        <label for="message" class="label"><span class="label-text">Phone Number</span></label>
        <textarea class="textarea textarea-bordered textarea-primary" placeholder="Bio"></textarea>
    </div>
    <div class="join flex flex-row w-full max-w-lg">
        <button class="btn btn-primary join-item flex-grow">Submit</button>
        <button class="btn btn-ghost join-item flex-grow">Bulk message</button>
    </div>
</div>
