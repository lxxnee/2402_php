<template>
    <!-- 리스트 -->
    <div class="board-list-box">
        <div v-for="(item, key) in $store.state.boardList" :key="key" class="item">
            <img @click="openModal(item)" :src="item.img" >
        </div>
    </div>

    <!-- 상세 모달 -->
    <div v-if="modalFlg" class="board-detail-box">
        <div class="item">
            <img :src="boardData.img" >
            <hr>
            <p>{{ boardData.content }}</p>
            <hr>
            <div class="etc-box">
                <span>{{ boardData.name }}</span>
                <button @click="modalFlg = false" class="btn btn-close btn-bg-black">닫기</button>
            </div>
        </div>
    </div>
 </template>
 
<script setup>
import { onBeforeMount, reactive, ref } from 'vue';
import store from '../js/store';
import router from '../js/router';

// 모달 처리
const modalFlg = ref(false);
let boardData = reactive({});

function openModal(data) {
    boardData = data;
    modalFlg.value = true;
}

// 비포 마운트 처리
onBeforeMount(() => {
    // 게시글 리스트 없을 때만 실행
    console.log('보드 비포 마운트');
    if(store.state.boardList.length < 1) {
        console.log('서버 요청 보냄');
        store.dispatch('getBoardList')
    }
});

// 스크롤 이벤트(추가 게시글 획득)
window.addEventListener('scroll', boardScrollEvent);

let flg = true; // 디바운싱 처리를 위한 플래그
function boardScrollEvent() {
    if(router.currentRoute.value.path == '/board') {
        console.log('보드 스크롤 이벤트 시작', store.state.noMoreBoardListFlg)
        if(flg && !store.state.noMoreBoardListFlg) {
            flg = false;
    
            const docHeight = document.documentElement.scrollHeight; // 문서 기준 총Y축 길이
            const winHeight = window.innerHeight; // 브라우저 창의 Y축 길이
            const nowHeight = window.scrollY; // 현재 스크롤 위치
            const viewHeight = docHeight - winHeight; // 끝까지 스크롤 했을 때의 Y축 위치
            // console.log('문서 Y : ' + docHeight);
            // console.log('윈도우 Y : ' + winHeight);
            // console.log('현재 Y : ' + nowHeight);
            // console.log('뷰 Y : ' + viewHeight);
            // console.log('------------------------');
            
            // 스크롤이 최하단 일경우 처리
            if(viewHeight <= nowHeight) {
                store.dispatch('getAddBoardList');
            }
    
            flg = true;
        }
        
        // 이벤트 제거 처리
        if(store.state.noMoreBoardListFlg) {
            window.removeEventListener('scroll', boardScrollEvent);
        }

    }
}
</script>
 
 <style>
 @import url('../css/boardList.css');
 </style>