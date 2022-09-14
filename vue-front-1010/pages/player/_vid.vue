<template>
  <div>
    <!-- 阿里云视频播放器样式 -->
    <link
      rel="stylesheet"
      href="https://g.alicdn.com/de/prismplayer/2.8.1/skins/default/aliplayer-min.css"
    />
    <!-- 阿里云视频播放器脚本 -->
    <script
      charset="utf-8"
      type="text/javascript"
      src="https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js"
    />
    <!-- 定义播放器dom -->
    <div id="J_prismPlayer" class="prism-player" />
  </div>
</template>

<script>
import vod from "@/api/vod";

export default {
  layout: "video",
  asyncData({ params, error }) {
    return vod.getPlayAuth(params.vid).then((response) => {
      var a = JSON.parse(response.data.data.playAuth);
      var b = a[0].playURL;

      return {
        vid: params.vid,
        playAuth: b,
      };
    });
  },
  mounted() {
    var player = new Aliplayer(
      {
        id: "J_prismPlayer",
        width: "100%",
        autoplay: false,
        cover: "http://liveroom-img.oss-cn-qingdao.aliyuncs.com/logo.png",
        //播放配置
        source : this.playAuth,
      },
      function (player) {
        console.log("播放器创建好了。");
      }
    );
  },
};
</script>