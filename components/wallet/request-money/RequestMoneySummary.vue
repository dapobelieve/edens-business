<template>
  <div class="h-100 d-flex flex-column modal-body px-0">
    <div class="flex-grow-1 px-4 py-3 mb-3" style="height: 24rem">
      <div class="border rounded-2 h-100 align-items-start d-flex p-4 mb-3">
        <div class="me-5"><img src="~/assets/images/request-summary.svg"></div>
        <div class="flex-grow-1">
          <div class="d-flex">
            <div>
              <div><span class="fw-bold text-black-50">Amount Requested:</span></div>
              <div class="fw-bold">{{ form.amount | currency }}</div>
            </div>
            <div class="ms-auto">
              <img class="cursor-pointer" src="~/assets/images/delete.svg">
            </div>
            <hr>
          </div>
          <div>
            <div><span class="fw-bold text-black-50">Note:</span></div>
            <div class="fw-bold">
              {{form.description}}
            </div>
            <hr>
          </div>
          <div>
            <div><span class="fw-bold text-black-50">Link:</span></div>
            <div class="fw-bold">
              <a class="text-eden-green text-decoration-underline">{{ form.link }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer ms-0 px-4 justify-content-end">
      <EdenButton :disabled="copied" :loading="btn.loading" @click="createLink(form.link)" type="button" class="btn btn-sm btn-jungle-green px-5">{{btn.text}}</EdenButton>
    </div>
  </div>
</template>
<script>
export default {
  props: ['form'],
  data() {
    return {
      copied: false,
      btn: {
        loading: false,
        text: 'Copy Link'
      }
    }
  },
  methods: {
    createLink(text) {
      // this.btn.loading = true
      // this.btn.text = 'Copying...'
      var selection, range
      let el = document.createElement('textArea');
      el.value = text
      el.contentEditable = true
      el.readOnly = true
      // el.style.display = 'none'
      document.body.appendChild(el)
      if(this.isIos) {
        range = document.createRange()
        range.selectNodeContents(el)
        selection = window.getSelection()
        selection.removeAllRanges()
        selection.addRange(range)
        el.setSelectionRange(0, 9999999)
      }else {
        el.select()
      }

      document.execCommand('copy')
      document.body.removeChild(el)
      this.copied = true
      this.btn.text = 'Copied'
      return true
    },
  }
}
</script>
