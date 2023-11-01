<script setup lang="ts">
import { reactive } from 'vue'
import { registryApi } from '@/api/api'
interface FormState {
  username: string
  password: string
  id: string
}

const formState = reactive<FormState>({
  id: '',
  username: '',
  password: ''
})
const onFinish = async (values: any) => {
  const data = await registryApi(values.id, values.username, values.password)
  console.log('Success:', values, data)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>
<template>
  <div
    class="w-1/2 shadow-md p-3 py-10 mm -translate-y-1/2 absolute top-1/2 left-1/2 -translate-x-1/2"
  >
    <h1 class="text-3xl text-center mb-2">注册</h1>
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="ID"
        name="id"
        :rules="[{ required: true, message: 'Please input your Id!' }]"
      >
        <a-input-password v-model:value="formState.id" />
      </a-form-item>
      <a-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 11, span: 16 }">
        <a-button html-type="submit" size="large">确认</a-button>
      </a-form-item>
    </a-form>
    <p class="text-right">
      <small>去<a href="/login" class="text-blue-500 underline mx-2">登陆</a> </small>
    </p>
  </div>
</template>
<style lang="scss">
.mm {
  border: 4px solid;
  border-image-source: linear-gradient(to right, red, #578aef);
  border-image-slice: 1;
}
</style>
;
