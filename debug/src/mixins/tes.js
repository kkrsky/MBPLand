export default {
  // exportする
  created() {
    console.log("start! from mixins."); // 起動後必ずログが出力される
  },

  data() {
    return {
      serverPass: "https://localhost:10443/", // サーバーサイドのパスを定義
    };
  },

  methods: {
    logging() {
      console.log("logging from mixins.");
    },
  },

  computed: {
    twoBytwo() {
      return 2 * 2;
    },
  },
};
