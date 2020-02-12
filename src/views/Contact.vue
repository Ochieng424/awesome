<template>
    <div class="container-fluid">
        <div class="container">
            <div class="row align-items-center" style="padding-top: 50px">
                <div class="col-lg-5 ml-auto d-none d-lg-block">
                    <img src="/img/contact.svg" alt="img" style="width: 350px;"/>
                </div>
                <div class="col-lg-6">
                    <h1 style="color: #355841;">Contact Me</h1>
                    <hr>
                    <address>
                        <abbr title="Phone"><i class="fa fa-phone" style="font-size: 25px; color: #355841;"></i></abbr>
                        <span style="font-size: 25px; color: #2a6dfb" class="ml-4">0715810055</span>
                        <br>
                        <abbr title="Email"><i class="fa fa-envelope" style="font-size: 25px; color: #355841;"></i> </abbr>
                        <a class="ml-4 mail" style="font-size: 25px" href="mailto:ochieng.derrick001@gmail.com">ochieng.derrick001@gmail.com</a>
                    </address>
                </div>
            </div>
        </div>
        <div class="vld-parent">
            <loading
                    name="loader"
                    :active.sync="isLoading"
                    :can-cancel="false"
                    :is-full-page="fullPage"
            ></loading>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Contact"
    }
</script>

<style scoped>
.mail{
    text-decoration: none;
}
    .mail:hover{
        text-decoration: none;
    }
</style>