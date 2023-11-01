<script setup lang="ts">
import { reactive } from 'vue'
import { loginApi } from '@/api/api'
interface FormState {
  username: string
  password: string
}

const formState = reactive<FormState>({
  username: '',
  password: ''
})

const onFinish = async (values: any) => {
  const d = await loginApi(values.username, values.password)
  console.log('Success:', values, d)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>
<template>
  <div
    class="w-1/2 shadow-md p-3 py-10 mm -translate-y-1/2 absolute top-1/2 left-1/2 -translate-x-1/2"
  >
    <h1 class="text-3xl text-center mb-2">登陆</h1>
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
      <small>
        还没有账号，去<a href="/register" class="text-red-500 underline mx-2">注册</a>
      </small>
    </p>
  </div>
</template>
<style lang="scss">
.mm {
  border: 4px solid;
  border-image-source: linear-gradient(to left, #8f41e9, #578aef);
  border-image-slice: 1;
}
</style>
