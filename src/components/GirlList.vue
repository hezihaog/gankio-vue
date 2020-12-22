<template>
  <div>
    <van-nav-bar title="妹子" fixed />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoadMore"
      >
        <van-cell v-for="(item, index) in girlList" :key="index">
          <a @click="handlePreviewImage(index)">
            <img :src="item.images[0]" class="card_item" />
          </a>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { ImagePreview } from "vant";

export default {
  data() {
    return {
      loading: true,
      error: false,
      finished: false,
      refreshing: false,
      girlList: [],
    };
  },
  methods: {
    //随机获取妹子图片
    fetchGirlList(isRefresh) {
      this.$http
        .get("https://gank.io/api/v2/random/category/Girl/type/Girl/count/10")
        .then((response) => {
          this.loading = false;
          if (response.data) {
            const result = response.data;
            this.error = false;
            //刷新
            if (isRefresh) {
              this.refreshing = false;
              this.girlList = result.data;
            } else {
              //加载更多
              this.girlList = this.girlList.concat(result.data);
            }
          } else {
            this.error = true;
          }
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    onRefresh() {
      this.fetchGirlList(true);
    },
    onLoadMore() {
      this.fetchGirlList(false);
    },
    //点击查看图片
    handlePreviewImage(index) {
      let that = this;
      ImagePreview({
        images: that.girlList.map((item) => {
          return item.images[0];
        }),
        closeable: true,
        startPosition: index,
      });
    },
  },
  mounted() {
    this.onRefresh();
  },
};
</script>

<style scoped>
.card_item {
  width: 100%;
  height: 100%;
}
</style>