import { RequestHook } from 'testcafe'
import { axiosInstance, sandboxAxiosInstance } from './api'

class SandboxRequestHook extends RequestHook {
  sandboxId?: string

  onRequest(event) {
    const { sandboxId } = this
    if (sandboxId) {
      event.requestOptions.headers['sandbox'] = sandboxId
    }

    return event
  }
  onResponse() {
    return null
  }
}

export async function initSandbox(t) {
  const { data: sandboxId } = await axiosInstance().post('sandbox')
  const hook = new SandboxRequestHook()
  hook.sandboxId = sandboxId
  t.ctx.sandboxId = sandboxId
  await t.addRequestHooks(hook)

  return sandboxId
}

export async function checkinSandbox(t) {
  const { sandboxId } = t.ctx
  return sandboxAxiosInstance(sandboxId).delete('sandbox')
}
