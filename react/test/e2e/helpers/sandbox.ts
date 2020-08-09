import { RequestHook } from 'testcafe'

import { axiosInstance, sandboxAxiosInstance } from './api'

class SandboxRequestHook extends RequestHook {
  sandboxId?: string

  async onRequest(event: any) {
    const { sandboxId } = this
    if (sandboxId) {
      event.requestOptions.headers.sandbox = sandboxId
    }

    return event
  }
  async onResponse() {
    return Promise.resolve()
  }
}

export async function initSandbox(t: TestController) {
  const { data: sandboxId } = await axiosInstance().post('sandbox')
  const hook = new SandboxRequestHook()
  hook.sandboxId = sandboxId
  t.ctx.sandboxId = sandboxId
  await t.addRequestHooks(hook)

  return sandboxId
}

export async function checkinSandbox(t: TestController) {
  const { sandboxId } = t.ctx
  return sandboxAxiosInstance(sandboxId).delete('sandbox')
}
