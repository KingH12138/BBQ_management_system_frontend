<script setup lang="ts">
import { ref } from 'vue';
import {getStickersByName,deleteStickerById, getStickersApi} from "@/api/api"
const sender = ref<string>('')

const items = ref<any>([])
const currentItem = ref()
const visible= ref(false)
const getAllItems = async () => {
  const data = await getStickersApi()
  items.value = data
}
const showDrawer = (item: any) => {
  visible.value = true
  currentItem.value = item
}
async function search(){
    if(sender.value){
        const data = await getStickersByName(sender.value)
        items.value = data
    }else{
        getAllItems()
    }
}
async function deleteSticker() {
    await deleteStickerById(currentItem.value.id)
    await search()    
}
const open = ref<boolean>(false);

function showModal(){
    open.value = true;
}
const handleOk = async(e: MouseEvent) => {
    deleteSticker().then(res=>{
        visible.value = false
        open.value = false;
    })
};

</script>

<template>
    <a-modal v-model:open="open" title="删除贴贴!" @ok="handleOk">
        <p class=" text-red-400">真的要删除人家吗？</p>
    </a-modal>
     <a-drawer title="详情" placement="right" :closable="false" v-model:visible="visible">
        <div
          class="aspect-square relative px-4 py-2 rounded-lg"
          :style="{ backgroundColor: currentItem.bgcolor ? currentItem.bgcolor : 'yellow' }"
        >
          <p class="mb-4 text-sm text-gray-500">
            xixi <span class="float-right">{{ currentItem.kind }}</span>
          </p>
          <p>{{ currentItem.content ? currentItem.content : '这个人很懒，什么都没留下。' }}</p>
          <p class="absolute bottom-2">
            <span class="text-xs">发言人：</span
            >{{ currentItem.sender ? currentItem.sender : '匿名' }}
          </p>
        </div>
        <a-button  @click="showModal" class=" float-right mr-2 mt-10">删除该标签</a-button>
      </a-drawer>
    <div class=" w-1/2 mx-auto mt-48">   
        <div class="options flex flex-row ">
            <a-input v-model:value="sender" placeholder="请输入发送者..." @keydown.enter="search"/>
            <a-button class="ml-2" @click="search">搜索</a-button>
        </div>
        <div v-if="items.length ===0" class=" text-3xl text-gray-400 text-center pt-10">
             没有留言...
        </div>
        <div class=" items grid gap-3 grid-cols-1 pt-4 sm:grid-cols-2">
            
            <div
            @click="showDrawer(i)"
            class="aspect-square item relative px-4 py-2 rounded-lg shadow-3xl"
            :style="{ backgroundColor: i.bgcolor ? i.bgcolor : 'yellow' }"
            v-for="i in items"
            :key="i"
            >
            <p class="mb-4 text-sm text-gray-500">
                xixi <span class="float-right">{{ i.kind }}</span>
            </p>
            <p class=" ">{{ i.content ? i.content : '这个人很懒，什么都没留下。' }}</p>
            <p class="absolute bottom-2">
                {{ i.sender ? i.sender : '匿名' }}
            </p>
            </div>
        </div>
    </div>
</template>