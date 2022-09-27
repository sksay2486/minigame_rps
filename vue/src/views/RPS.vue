<template>
    <div class="play-div">
        <div class="result-div">
            <div class="user-div">
                <div class="user-result-text-box">
                    <div style="margin-right: 20px;">상대</div>
                    <div id="userSelectedDiv">{{ userResult }}</div>
                </div>
                <img :src="userSelectedImg" :style="userSelectedImgStyle" />
            </div>
            <div class="my-div">
                <img :src="mySelectedImg" :style="mySelectedImgStyle" />
                <div class="my-result-text-box">
                    <div style="margin-right: 20px;">나</div>
                    <div id="mySelectedDiv">{{ myResult }}</div>
                </div>
            </div>
        </div>
        <div class="select-div">
            <img v-for="(rps, idx) in rps_arr_json" :key="idx" :src="rps.src" class="rps-image" @click="rpsStart(rps.idx)" />
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue';

export default {
    setup() {
        const scissorsImg = ref(require('@/assets/images/scissors.png'));
        const rockImg = ref(require('@/assets/images/rock.png'));
        const paperImg = ref(require('@/assets/images/paper.png'));

        const rps_arr_json = [
            { idx: 0, key: 'scissors', src: scissorsImg.value },
            { idx: 1, key: 'rock', src: rockImg.value },
            { idx: 2, key: 'paper', src: paperImg.value },
        ];

        let userSelectedImg = ref('');
        let userSelectedImgStyle = reactive({ width: '0px', height: '0px' });
        let mySelectedImg = ref('');
        let mySelectedImgStyle = reactive({ width: '0px', height: '0px' });

        let userResult = ref('');
        let myResult = ref('');
        
        const com_result = () => {
            const result = Math.floor(Math.random() * 3);

            // userSelectedImg.value = result === 0 ? scissorsImg : result === 1 ? rockImg : paperImg;

            if(result === 0) userSelectedImg.value = scissorsImg.value;
            else if(result === 1) userSelectedImg.value = rockImg.value;
            else if(result === 2) userSelectedImg.value = paperImg.value;

            userSelectedImgStyle.width = '150px';
            userSelectedImgStyle.height = '150px';

            return result;
        }

        const showSelectedValue = (selectedValue) => {
            // mySelectedImg.value = result === 0 ? scissorsImg : result === 1 ? rockImg : paperImg;

            if(selectedValue === 0) mySelectedImg.value = scissorsImg.value;
            else if(selectedValue === 1) mySelectedImg.value = rockImg.value;
            else if(selectedValue === 2) mySelectedImg.value = paperImg.value;

            mySelectedImgStyle.width = '150px';
            mySelectedImgStyle.height = '150px';
        }
        
        const rps_result = (userRes, myRes) => {
            if(myRes === userRes) {
                myResult.value = '무승부';
                userResult.value = '무승부';
            }
            else {
                if(myRes === 0 && userRes === 1) {
                    myResult.value = '졌다';
                    userResult.value = '이겼다';
                }
                else if(myRes === 0 && userRes === 2) {
                    myResult.value = '이겼다';
                    userResult.value = '졌다';
                }
                else if(myRes === 1 && userRes === 2) {
                    myResult.value = '졌다';
                    userResult.value = '이겼다';
                }
                else if(myRes === 1 && userRes === 0) {
                    myResult.value = '이겼다';
                    userResult.value = '졌다';
                }
                else if(myRes === 2 && userRes === 0) {
                    myResult.value = '졌다';
                    userResult.value = '이겼다';
                }
                else if(myRes === 2 && userRes === 1) {
                    myResult.value = '이겼다';
                    userResult.value = '졌다';
                }
            }
        }

        const rpsStart = (selectedValue) => {
            const result = com_result();
            showSelectedValue(selectedValue);
            rps_result(result, selectedValue);
        }
        
        return {
            rps_arr_json,
            userSelectedImg,
            mySelectedImg,
            userSelectedImgStyle,
            mySelectedImgStyle,
            userResult,
            myResult,
            rpsStart
        };
    }
}
</script>

<style lang="scss" scoped>
.play-div {
    width: 100%;
    height: 100%;
    text-align: center;
    background-color: #eeeeee;

    .result-div {
        width: 100%;
        height: 80%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .user-div {
            margin: 50px 0;

            .user-result-text-box {
                margin-bottom: 25px;
                display: flex;
                justify-content: center;
            }
        }

        .my-div {
            margin: 50px 0;

            .my-result-text-box {
                margin-top: 25px;
                display: flex;
                justify-content: center;
            }
        }
    }

    .select-div {
        width: 100%;
        height: 20%;
        background-color: white;
        padding-top: 25px;

        .rps-image {
            width: 150px;
            height: 150px;
            margin: 0 10px;
            cursor: pointer;
        }
    }
}
</style>