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

const getAllItems = async () => {
  const data = await getStickersApi()
  items.value = data
}
const writeVisible = ref(false)
const visible = ref<boolean>(false)

const showDrawer = () => {
  visible.value = true
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
const changeCategory = (category: string) => {
  form.kind = category
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
  <div class="w-screen min-h-screen bg-red-500 pt-20">
    <h1 class="text-center text-6xl mb-4">留言墙</h1>
    <p class="text-center text-sm">很多事情值得记录，当然也值得回味。</p>
    <div class="flex flex-row justify-center gap-5 mt-10">
      <span v-for="category in categories" :key="category">
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
                <a-input style="border: none" v-model:value="form.sender" placeholder="签名" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col>
              <p class="mb-2">选择标签</p>
              <span
                v-for="category in categories.slice(1)"
                @click="changeCategory(category)"
                class="mx-1 rounded-lg p-2"
                :style="{ backgroundColor: form.kind === category ? 'gray' : '' }"
                :key="category"
              >
                {{ category }}
              </span>
            </a-col>
          </a-row>
          <a-form-item class="mt-10" :wrapper-col="{ offset: 18 }">
            <a-button @click="onSubmit">给Ta</a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-drawer>
    <a-drawer title="Basic Drawer" placement="right" :closable="false" v-model:visible="visible">
    </a-drawer>
    <div class="items grid gap-3 grid-cols-4 p-10">
      <div
        @click="showDrawer"
        class="aspect-square"
        :style="{ backgroundColor: i.bgcolor ? i.bgcolor : 'yellow' }"
        v-for="i in items"
        :key="i"
      >
        {{ i }}
      </div>
    </div>
    <div
      class="fixed right- z-[1000] bottom-4 w-[60px] h-[60px] bg-green-400 leading-[60px] shadow-lg rounded-full text-4xl text-center"
      @click="writeASticker"
    >
      +
    </div>
  </div>
</template>
