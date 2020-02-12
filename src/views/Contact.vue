<template>
    <div class="container-fluid">
        <div class="container">
            <div class="row align-items-center" style="padding-top: 50px">
                <div class="col-lg-5 ml-auto d-none d-lg-block">
                    <img src="/img/contact.svg" alt="img" style="width: 350px;" />
                </div>
                <div class="col-lg-6">
                    <span class="text-primary"><i class="fa fa-envelope" style="font-size: 25px;"></i> </span>
                    <span class="ml-2" style="font-size: 25px;">ochieng.derrick001@gmail.com</span>
                    <br>
                    <span class="text-primary"><i class="fa fa-phone" style="font-size: 25px;"></i> </span>
                    <span class="ml-2" style="font-size: 25px;">0715810055</span>
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

</style>