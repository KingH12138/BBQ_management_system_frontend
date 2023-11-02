<script setup lang="ts">
import { getStickersApi } from '@/api/api'
import type { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import { onMounted, reactive, ref, toRaw } from 'vue'
import { writeStickerApi } from '@/api/api'
const categories = ['全部', '留言', '目标', '理想', '爱情']

const items = ref<any>([])

const corlors = [
  'rgb(252, 175, 162)',
  'rgb(255, 227, 148)',
  'rgb(146, 230, 245)',
  'rgb(168, 237, 138)',
  'rgb(202, 167, 247)'
]

const currentCategory = ref('全部')
const getAllItems = async () => {
  const data = await getStickersApi()
  items.value = data
}
const writeVisible = ref(false)
const visible = ref<boolean>(false)

const currentItem = ref<any>({})

const showDrawer = (item: any) => {
  visible.value = true
  currentItem.value = item
}
const writeASticker = () => {
  writeVisible.value = true
}
onMounted(() => {
  getAllItems()
})

const rules = {
  content: [{ required: true, message: '请输入你的留言内容' }]
}
const form = reactive({
  content: '',
  sender: '',
  kind: '',
  bgColor: ''
})
const changeColor = (event: MouseEvent, color: string) => {
  form.bgColor = color
}
const formRef = ref()
const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      const formState = toRaw(form)
      const data = await writeStickerApi(
        parseInt(Math.random() * 100 + Math.random() * 1000 + '') + '',
        formState.sender === '' ? '匿名' : formState.sender,
        formState.content,
        formState.kind,
        formState.bgColor
      )

      writeVisible.value = false
      getAllItems()
      form.content = ''
      form.bgColor = ''
      form.sender = ''
      form.kind = ''
    })
    .catch((error: ValidateErrorEntity) => {
      alert('输入不完整')
    })
}
</script>

<template>
  <div class="w-screen min-h-screen relative">
    <video src="@/assets/qm1.mp4" autoplay loop></video>
    <div class="w-screen pt-20 px-40 absolute top-0 left-0">
      <h1 class="text-center text-6xl mb-4">留言墙</h1>
      <p class="text-center text-sm">很多事情值得记录，当然也值得回味。</p>
      <div class="flex flex-row justify-center gap-5 mt-10">
        <span
          v-for="category in categories"
          :key="category"
          @click="currentCategory = category"
          class="px-2 py-1 rounded-xl cursor-pointer"
          :style="{
            border: currentCategory === category ? '1px solid black' : 'none',
            fontWeight: currentCategory === category ? 'bold' : 'normal'
          }"
        >
          {{ category }}
        </span>
      </div>
      <a-drawer title="留言" placement="right" :closable="false" v-model:visible="writeVisible">
        <div>
          <span
            class="inline-block w-[20px] mx-1 h-[20px]"
            v-for="color in corlors"
            :key="color"
            :style="{ backgroundColor: color }"
            @click="changeColor($event, color)"
          ></span>
          <a-form ref="formRef" :model="form" :rules="rules" layout="vertical">
            <a-row :gutter="16">
              <a-col :span="24">
                <a-form-item name="content">
                  <br />
                  <a-textarea
                    :style="{ backgroundColor: form.bgColor }"
                    v-model:value="form.content"
                    :rows="4"
                    placeholder="请输入留言内容..."
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="5" :offset="18">
                <br />
                <a-form-item name="sender">
                  <a-input
                    style="border: none; outline: none"
                    v-model:value="form.sender"
                    placeholder="签名"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col>
                <p class="mb-2">选择标签</p>
                <span
                  v-for="category in categories.slice(1)"
                  @click="form.kind = category"
                  class="mx-1 rounded-lg p-2"
                  :style="{ backgroundColor: form.kind === category ? 'gray' : '' }"
                  :key="category"
                >
                  {{ category }}
                </span>
              </a-col>
            </a-row>
            <a-form-item class="mt-10" :wrapper-col="{ offset: 18 }">
              <a-button @click="onSubmit">SEND</a-button>
            </a-form-item>
          </a-form>
          <p class="font-bold">免责声明</p>
          <p class="text-sm">
            本人独自开发，为便于与用户交流的留言平台。请不要利用此平台服务制作、上传、下载、复制、发布、传播或者转载如下内容：
          </p>
          <ul class="text-xs">
            <li>1.反对宪法所确定的基本原则的；</li>
            <li>2.危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家 统一的；</li>
            <li>3.损害国家荣誉和利益的；</li>
            <li>4.煽动民族仇恨、民族歧视，破坏民族团结的；</li>
            <li>5.破坏国家宗教政策，宣扬邪教和封建迷信的；</li>
            <li>6.散布谣言，扰乱社会秩序，破坏社会稳定的；</li>
            <li>7.散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</li>
            <li>8.侮辱或者诽谤他人，侵害他人合法权益的；</li>
            <li>9.含有法律、行政法规禁止的其他内容的信息。</li>
          </ul>
        </div>
      </a-drawer>
      <a-drawer title="详情" placement="right" :closable="false" v-model:visible="visible">
        <h2 class="text-blue-600 mb-8">
          要墙主撕下该便签 <span class="ml-8 text-orange-600 cursor-pointer">举办</span>
        </h2>
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
      </a-drawer>
      <div class="items grid gap-3 grid-cols-4 p-10">
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
      <div
        class="fixed right-10 z-[1000] bottom-4 w-[60px] h-[60px] bg-green-400 leading-[60px] shadow-lg rounded-full text-4xl text-center"
        @click="writeASticker"
      >
        +
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.item {
  cursor: pointer;
  transition: all 0.3s;
  transform-origin: bottom;
  &:hover {
    transform: scale(1.05);
  }
}
</style>
