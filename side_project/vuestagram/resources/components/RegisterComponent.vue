<template>
    <div class="form-box">
        <h3 class="form-title">회원가입</h3>
        <input v-model="userInfo.account" type="text" name="account" placeholder="아이디">
        <input v-model="userInfo.password" type="password" name="password" placeholder="비밀번호" autoComplete="off">
        <input v-model="userInfo.password_chk" type="password" name="password_chk" placeholder="비밀번호 확인" autoComplete="off">
        <input v-model="userInfo.name" type="text" name="name" placeholder="이름" autoComplete="off">
        <div class="radio-box">
            <div>
                <label for="male">남자</label>
                <input v-model="userInfo.gender" type="radio" name="gender" id="male" value="0">
            </div>
            <div>
                <label for="female">여자</label>
                <input v-model="userInfo.gender" type="radio" name="gender" id="female" value="1">
            </div>
        </div>
        <input type="file" name="profile" accept="image/*" @change="handleFileChange">
        <hr>
        <button @click="register" class="btn btn-submit btn-bg-black">완료</button>
        <button @click="$router.back()" class="btn btn-submit">취소</button>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const userInfo = reactive({
    account: '',
    password: '',
    password_chk: '',
    name: '',
    gender: '',
    profile: null,
});

const handleFileChange = (event) => {
    userInfo.profile = event.target.files[0];
};

const register = () => {
    store.dispatch('register', userInfo);
};
</script>

<style>

</style>
