<template>
  <v-app>
    <!-- <router-view /> -->

    <div id="app">
      <v-app>
        <!-- <v-app> -->
        <!-- loading -->
        <v-container id="LoadingContainer" v-show="loadingObj.isLoading">
          <!-- <v-container id="LoadingContainer"> -->
          <v-row class="circular">
            <v-col>
              <v-progress-circular indeterminate />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div class="message" v-show="loadingObj.message">
                {{ loadingObj.message }}
              </div>
            </v-col>
          </v-row>
        </v-container>
        <!-- snackBar -->
        <v-snackbar
          v-model="isSnackbar"
          app
          top
          :timeout="snackbarObj.timeout"
          >{{ snackbarObj.message }}</v-snackbar
        >
        <!-- ナビゲーター -->

        <v-navigation-drawer
          app
          clipped
          fixed
          v-model="leftDrawer"
          :mini-variant="leftMiniVariant"
        >
          <v-list dense>
            <v-list-item class="px-2">
              <v-list-item-avatar>
                <v-img :src="userObj.iconUrl"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ userObj.name }}</v-list-item-title>
                <v-list-item-subtitle>Logged In</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-subheader>Menue</v-subheader>
            <v-list-item-group>
              <!-- v-model="selectedItem" color="primary" -->
              <v-list-item
                v-for="(item, i) in leftDrowerList"
                @click="item.isShow = !item.isShow"
                :key="item.id"
                :class="item.isShow ? '' : 'semi-disable'"
              >
                <!-- :to="item.goto" -->
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
        <!-- トップバー -->
        <v-app-bar app>
          <v-app-bar-nav-icon
            @click="leftDrawer = !leftDrawer"
          ></v-app-bar-nav-icon>
          <v-btn @click="leftDrawer = !leftDrawer">leftDrawer</v-btn>
          <v-btn @click="rightDrawer = !rightDrawer">rightDrawer</v-btn>
          <v-btn @click="leftMiniVariant = !leftMiniVariant"
            >leftMiniVariant</v-btn
          >
          <v-toolbar-title>Title</v-toolbar-title>
        </v-app-bar>

        <!-- メイン -->
        <v-main>
          <div v-show="isShowDisplayById(0)">全体のお知らせ</div>
          <div v-show="isShowDisplayById(1)">みんなのおかねのやりとり</div>
          <div v-show="isShowDisplayById(2)">あなたのおかねのやりとり</div>
          <div v-show="isShowDisplayById(3)">支払いリスト</div>
          <div v-show="isShowDisplayById(4)">請求リスト</div>
          <div v-show="isShowDisplayById(5)">
            <!-- <iframe src="./views/Subscrive.html" frameborder="0"></iframe> -->
            <div id="subscribe">
              <v-app>
                <v-card class="subscribe-card">
                  <v-form action="" :ref="subscObj.refName">
                    <!-- <v-container>
          <v-row>
            <v-col> -->
                    <v-container>
                      <v-select
                        v-model="memberObj.selectMemberObj"
                        :items="memberObj.list"
                        item-textå="name"
                        item-value="userId"
                        label="支払った人"
                        chips
                        hint="異なる場合は選択してください。"
                        return-object
                      >
                      </v-select>
                      <div class="mt-2"></div>

                      <v-select
                        v-model="paymentObj.selectPaymentObj"
                        :items="paymentObj.list"
                        item-text="label"
                        item-value="value"
                        label="請求先"
                        chips
                        hint="請求先を選択してください。"
                        readonly
                      >
                      </v-select>

                      <div class="mt-10"></div>
                      <v-select
                        v-model="subscObj.selectItemArry"
                        :items="subscObj.list"
                        label="Subscribe List(*MUST)"
                        chips
                        multiple
                        hint="購入した品目を選択してください。"
                      >
                      </v-select>
                      <!-- <v-text-field
            v-model="subscObj.selectItemArry[0]"
            style="display: none"
            :rules="[validateRules.required]"
          ></v-text-field> -->

                      <div class="mt-5"></div>
                      <div
                        v-for="(item, index) in subscObj.selectItemArry"
                        :key="item"
                      >
                        <v-card>
                          <v-container>
                            <v-row>
                              <v-col class="select-subscribe-title">
                                {{ item }}
                              </v-col>
                              <v-col>
                                <div style="display: none">
                                  {{
                                    subscObj.selectPriceTypeArry[index]
                                      ? null
                                      : (subscObj.selectPriceTypeArry[index] =
                                          subscObj.writePriceType[0])
                                  }}
                                </div>
                                <v-select
                                  v-model="subscObj.selectPriceTypeArry[index]"
                                  :items="subscObj.writePriceType"
                                  label="金額の記入方式"
                                  chips
                                >
                                </v-select>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col>
                                <v-text-field
                                  v-model="subscObj.selectItemPriceArry[index]"
                                  :label="'金額'"
                                  :rules="[
                                    validateRules.required,
                                    validateRules.number,
                                  ]"
                                >
                                </v-text-field>
                              </v-col>

                              <v-col>
                                <v-text-field
                                  v-model="subscObj.selectItemNumArry[index]"
                                  :label="'購入数'"
                                  :rules="[
                                    validateRules.required,
                                    validateRules.number,
                                    validateRules.exceptZero,
                                  ]"
                                >
                                </v-text-field>
                              </v-col>
                            </v-row>

                            <!-- <v-divider></v-divider> -->
                          </v-container>
                        </v-card>
                        <div class="mt-1"></div>
                      </div>

                      <div class="mt-5"></div>

                      <div class="additional-list-btn-container">
                        <v-btn rounded @click="subscObj.addItemNum++"
                          ><v-icon left> mdi-plus </v-icon>リストに追加</v-btn
                        ><v-btn rounded @click="subscObj.otherItemNum++"
                          ><v-icon left> mdi-plus </v-icon>その他の品</v-btn
                        >
                      </div>
                      <div class="mt-5"></div>

                      <div
                        v-for="addItemNum in subscObj.addItemNum"
                        :key="'add-' + addItemNum"
                      >
                        <div style="display: none">
                          {{
                            subscObj.addPriceTypeArry[addItemNum - 1]
                              ? null
                              : (subscObj.addPriceTypeArry[addItemNum - 1] =
                                  subscObj.writePriceType[0])
                          }}
                          {{
                            subscObj.addIsShow[addItemNum - 1] === false
                              ? null
                              : (subscObj.addIsShow[addItemNum - 1] = true)
                          }}
                        </div>
                        <v-card v-if="subscObj.addIsShow[addItemNum - 1]">
                          <v-container>
                            <v-row>
                              <v-col class="select-subscribe-title"
                                >{{ subscObj.listAddName }}
                              </v-col>
                              <v-col>
                                <v-select
                                  v-model="
                                    subscObj.addPriceTypeArry[addItemNum - 1]
                                  "
                                  :items="subscObj.writePriceType"
                                  label="金額の記入方式"
                                  chips
                                >
                                </v-select>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col>
                                <v-text-field
                                  v-model="subscObj.addNameArry[addItemNum - 1]"
                                  label="品名"
                                  :rules="[validateRules.required]"
                                ></v-text-field>
                              </v-col>

                              <v-col>
                                <v-text-field
                                  v-model="
                                    subscObj.addPriceArry[addItemNum - 1]
                                  "
                                  :label="'金額'"
                                  :rules="[
                                    validateRules.required,
                                    validateRules.number,
                                  ]"
                                >
                                </v-text-field>
                              </v-col>

                              <v-col>
                                <v-text-field
                                  v-model="subscObj.addNumArry[addItemNum - 1]"
                                  :label="'購入数'"
                                  :rules="[
                                    validateRules.required,
                                    validateRules.number,
                                    validateRules.exceptZero,
                                  ]"
                                >
                                </v-text-field>
                              </v-col>
                              <v-col cols="2" class="delete-btn">
                                <v-btn
                                  icon
                                  small
                                  color="secondary"
                                  outlined
                                  @click="
                                    deleteSubscribeList('add', addItemNum - 1)
                                  "
                                >
                                  <v-icon dark> mdi-minus </v-icon>
                                </v-btn>
                              </v-col>
                            </v-row>

                            <!-- <v-divider></v-divider> -->
                          </v-container>
                        </v-card>
                        <div class="mt-1"></div>
                      </div>

                      <div class="mt-5"></div>
                      <div
                        v-for="otherItemNum in subscObj.otherItemNum"
                        :key="'other-' + otherItemNum"
                      >
                        <div style="display: none">
                          {{
                            subscObj.otherPriceTypeArry[otherItemNum - 1]
                              ? null
                              : (subscObj.otherPriceTypeArry[otherItemNum - 1] =
                                  subscObj.writePriceType[0])
                          }}
                          {{
                            subscObj.otherIsShow[otherItemNum - 1] === false
                              ? null
                              : (subscObj.otherIsShow[otherItemNum - 1] = true)
                          }}
                          <!-- :key="'other-'+otherItemNum" -->
                        </div>
                        <v-card v-if="subscObj.otherIsShow[otherItemNum - 1]">
                          <v-container>
                            <v-row>
                              <v-col class="select-subscribe-title"
                                >{{ subscObj.listOtherName }}
                              </v-col>
                              <v-col>
                                <v-select
                                  v-model="
                                    subscObj.otherPriceTypeArry[
                                      otherItemNum - 1
                                    ]
                                  "
                                  :items="subscObj.writePriceType"
                                  label="金額の記入方式"
                                  chips
                                >
                                </v-select>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col>
                                <v-text-field
                                  v-model="
                                    subscObj.otherNameArry[otherItemNum - 1]
                                  "
                                  label="品名"
                                  :rules="[validateRules.required]"
                                ></v-text-field>
                              </v-col>

                              <v-col>
                                <v-text-field
                                  v-model="
                                    subscObj.otherPriceArry[otherItemNum - 1]
                                  "
                                  :label="'金額'"
                                  :rules="[
                                    validateRules.required,
                                    validateRules.number,
                                  ]"
                                >
                                </v-text-field>
                              </v-col>

                              <v-col>
                                <v-text-field
                                  v-model="
                                    subscObj.otherNumArry[otherItemNum - 1]
                                  "
                                  :label="'購入数'"
                                  :rules="[
                                    validateRules.required,
                                    validateRules.number,
                                    validateRules.exceptZero,
                                  ]"
                                >
                                </v-text-field>
                              </v-col>
                              <v-col cols="2" class="delete-btn">
                                <v-btn
                                  icon
                                  small
                                  color="secondary"
                                  outlined
                                  @click="
                                    deleteSubscribeList(
                                      'other',
                                      otherItemNum - 1
                                    )
                                  "
                                >
                                  <v-icon dark> mdi-minus </v-icon>
                                </v-btn>
                              </v-col>
                            </v-row>

                            <!-- <v-divider></v-divider> -->
                          </v-container>
                        </v-card>
                        <div class="mt-1"></div>
                      </div>

                      <div class="mt-5"></div>
                      <v-textarea
                        v-model="subscObj.memo"
                        label="メモ"
                        hint="この決済に対してメモを残します。"
                        outlined
                        rows="2"
                      >
                      </v-textarea>

                      <!-- <input
                  style="display: none"
                  ref="input"
                  type="file"
                  accept="image/jpeg, image/jpg, image/png"
                  @change="selectedFile()"
                />
                <v-btn color="primary" @click="fileInputBtnclick"
                  >select image</v-btn
                > -->
                      <v-text-field
                        v-model="subscObj.uploadFile"
                        :rules="[validateRules.required]"
                        style="display: none"
                      >
                      </v-text-field>

                      <p class="photo-upload-title">
                        レシート画像をアップロード(*MUST)
                      </p>
                      <div class="photo-upload-container">
                        <!-- <v-btn
                  tile
                  color="success"
                  @click="subscObj.isCapture=!subscObj.isCaptur"
                >
                  <v-icon left> mdi-pencil </v-icon>
                  Edit
                </v-btn> -->
                        <img-inputer
                          v-model="subscObj.uploadFile"
                          theme="light"
                          size="large"
                          placeholder="ファイルをドロップするかここをクリックしてください"
                          bottom-text="ファイルをドロップするかここをクリックしてください"
                        />
                      </div>
                      <!-- </v-col> -->
                      <!-- </v-row> -->
                      <!-- <v-row class="submit-container"> -->
                      <div class="mt-5"></div>
                      <div>
                        <p>
                          ※{{
                            memberObj.selectMemberObj.name
                          }}さんとして支払いを登録します。
                        </p>
                      </div>
                      <div class="mt-5"></div>
                      <div class="submit-container">
                        <v-btn
                          @click="submitSubscribe"
                          rounded
                          color="success"
                          block
                          >送信</v-btn
                        >
                      </div>

                      <!-- </v-row>
        </v-container> -->
                    </v-container>
                  </v-form>
                </v-card>
              </v-app>
            </div>
          </div>
          <div v-show="isShowDisplayById(6)">設定</div>
          <div v-show="isShowDisplayById(7)" @click="test2">テスト</div>
          <div v-show="isShowDisplayById(8)"></div>
          <router-view />
        </v-main>

        <!-- フッター -->
        <v-footer fixed app
          ><span>&copy; 2021 Mannenbashi Park Land</span></v-footer
        >
      </v-app>
    </div>
    <!--<div id="app">バインドしているスプレッドシート名は {{ssName}} です。
    <button @click="changeMessage()">テキスト変更！</button>
    </div>
    -->
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => {
    return {
      deviceready: false,
      queryObj: {}, //自動挿入
      userObj: { userId: "Guest", name: "Guest" }, //自動挿入
      memberObj: {
        list: [
          { name: "A", userId: 1 },
          { name: "B", userId: 2 },
        ], //自動挿入
        selectMemberObj: [], //代理ログイン用,現在のユーザーが自動挿入
        subscribeMemberList: [], //自動挿入
      },
      paymentObj: {
        list: [{ label: "SUBSCRIBE", value: "SUBSCRIBE" }],
        selectPaymentObj: { label: "SUBSCRIBE", value: "SUBSCRIBE" },
        TYPE: {
          SUBSCRIBE: "SUBSCRIBE",
          ERROR: "ERROR",
        },
        requestUserIdArry: [], //請求するユーザーIDリスト
      },
      subscObj: {
        refName: "subscribe_form",
        database: {}, //自動挿入
        list: ["A", "B", "C", "その他", "追加"],
        writePriceType: ["１個当たりの値段", "合計金額"],
        ATTRIBUTE_LIST: {
          LISTED: "LISTED",
          ADD: "ADD",
          OTHER: "OTHER",
          ERROR: "ERROR",
        },

        //リスト情報
        selectItemArry: [], //selectItem_i
        selectItemPriceArry: [], //selectItem_i
        selectItemNumArry: [], //selectItem_i
        selectPriceTypeArry: [], //selectItem_i

        //追加情報
        listAddName: "[追加]",
        addItemNum: 0,
        addNameArry: [], //add_i
        addPriceArry: [], //add_i
        addNumArry: [], //add_i
        addPriceTypeArry: [], //add_i
        addIsShow: [], //add_i

        //その他情報
        listOtherName: "[その他]",
        otherItemNum: 0,
        otherNameArry: [], //other_i
        otherPriceArry: [], //other_i
        otherNumArry: [], //other_i
        otherPriceTypeArry: [], //other_i
        otherIsShow: [], //other_i

        memo: "", //投稿に対しての備考
        uploadFile: "",
      },
      validateRules: {
        required: (value) => !!value || "必ず入力してください", // 入力必須の制約
        number: (value) => !isNaN(Number(value)) || "数値を入力してください", // 入力必須の制約
        exceptZero: (value) => !(value == 0) || "0は入力できません。", // 入力必須の制約
      },
      loadingObj: {
        isLoading: false,
        message: "Loading...",
      },
      helper: {},
      submitObj: {
        template: {
          // deal_id:'', //自動挿入される
          createAt: "",
          deleteAt: "",
          updateAt: "",
          submitType: "DEFAULT",
          attribute: null,
          buyUserId: null,
          buyUserName: null,
          requestUserIdArry: [],
          name: null,
          num: null,
          price: null,
          sumPrice: null,
          memo: "",
          imageName: null,
          // imageUrl:''//自動挿入される
        },
        TYPE: {
          SUBSCRIBE: "SUBSCRIBE", //サブスク
          BUY: "BUY", //購入
          REQUEST: "REQUEST", //請求
          PAYMENT: "PAYMENT", //返金
          NOTICE: "NOTICE", //通知
          ERROR: "ERROR", //エラー
        },
      },
      leftMiniVariant: false,
      leftDrawer: false,
      rightDrawer: false,
      selectedItem: 1,
      userDataArryKey: [
        "createAt",
        "deleteAt",
        "name",
        "userId",
        "status",
        "iconUrl",
        "ZZZ",
      ],
      leftDrowerList: [
        {
          id: 0,
          text: "全体のお知らせ",
          icon: "mdi-newspaper",
          goto: "/",
          isShow: true,
        },
        {
          id: 1,
          text: "みんなのおかねのやりとり",
          icon: "mdi-credit-card-multiple",
          goto: "/",
          isShow: true,
        },
        {
          id: 2,
          text: "あなたのおかねのやりとり",
          icon: "mdi-credit-card",
          goto: "/",
          isShow: true,
        },
        {
          id: 3,
          text: "支払いリスト",
          icon: "mdi-export",
          goto: "/",
          isShow: true,
        },
        {
          id: 4,
          text: "請求リスト",
          icon: "mdi-import",
          goto: "/",
          isShow: true,
        },
        {
          id: 5,
          text: "請求を追加",
          icon: "mdi-import",
          goto: "/",
          isShow: true,
        },
        {
          id: 6,
          text: "設定",
          icon: "mdi-settings",
          goto: "settings",
          isShow: true,
        },
        {
          id: 7,
          text: "テスト",
          icon: "mdi-flag",
          goto: "test",
          isShow: true,
        },
        {
          id: 8,
          text: "テスト2",
          icon: "mdi-flag",
          goto: "test",
          isShow: true,
        },
      ],
    };
  },
  created() {
    this.initCreated();
  },
  mounted() {
    window.setTimeout(() => {
      this.initDeviceready();
    }, 1000);
  },
  computed: {
    isSnackbar: {
      get() {
        return this.$store.getters["snackbarState/getIsSnackbar"];
      },
      set(bool) {
        this.$store.dispatch("snackbarState/setIsSnackbar", bool);
      },
    },
    snackbarObj: {
      get() {
        return this.$store.getters["snackbarState/getSnackbarObj"];
      },
      // set(val) {
      //   this.$store.dispatch("snackbarState/setMessage", val);
      // },
    },
  },
  methods: {
    //init
    async initCreated() {
      this.initQueryData();
      await this.initMemberObj();
      this.initUserObj(this.queryObj.userId);
      this.initSubscribeList();
      console.log("this.subscObj", this.subscObj);
    },
    initQueryData(queryData) {
      if (!queryData) {
        queryData = {
          userId: "U908d37a8e2f8d8ccf51edcf44ddbffd1",
        };
      }
      let keys = Object.keys(queryData);
      keys.forEach((key) => {
        this.queryObj[key] = queryData[key];
        // switch (key) {
        //   case "userId": {
        //     this.userObj.userId = queryData[key];
        //     break;
        //   }
        // }
      });
    },

    async initMemberObj() {
      // this.memberObj.list = this._cp(this.userObj);

      let userSheetDataArry = await gasFunc("getSheetUserList");
      userSheetDataArry = JSON.parse(userSheetDataArry);
      let { sheetName, dataLabelArry, sheetDataArry } = userSheetDataArry;
      this.memberObj.list = sheetDataArry.map((dataArry) => {
        let obj = {};
        dataLabelArry.forEach((key, key_i) => {
          obj[key] = dataArry[key_i];
        });
        return obj;
      });
    },
    initUserObj(userId) {
      let userObj = { userId: "Guest", name: "Guest" };
      if (userId) {
        let userObj_temp = this.memberObj.list.find((member) => {
          return member.userId === userId;
        });
        if (userObj_temp) userObj = userObj_temp;
      }
      this.userObj = userObj;
      this.memberObj.selectMemberObj = this._cp(userObj);
    },

    async initSubscribeList() {
      let dataForClientObj = await gasFunc("getSubscribeList");
      let { sheetName, dataLabelArry, sheetDataArry } = JSON.parse(
        dataForClientObj
      );
      this.subscObj.database = sheetDataArry;
      this.subscObj.list = sheetDataArry.map((v) => {
        return v[0];
      });
      // let getData = (dataForClientObj) => {
      //   let { sheetName, dataLabelArry, sheetDataArry } = dataForClientObj;
      //   this.subscObj.database = sheetDataArry;
      //   this.subscObj.list = sheetDataArry.map((v) => {
      //     return v[0];
      //   });

      // this.subscObj.database = subscListArry;
      // if (subscListArry.length > 1) {
      //   this.subscObj.list = subscListArry
      //     .filter((v, i) => {
      //       return i !== 0;
      //     })
      //     .map((v) => {
      //       return v[0];
      //     });
      //   // this.subscObj.list.push(this.subscObj.listAddName);
      //   // this.subscObj.list.push(this.subscObj.listOtherName);
      // }

      // };
      // google.script.run.withSuccessHandler(getData).getSubscribeList();
    },
    initDeviceready() {
      this.deviceready = true;
      let tes = window.document.getElementById("app");
      tes.style.display = "block";
      console.log(tes, this);
    },

    ///////////////////
    //common
    //////////////////
    onUserChange({ userId, name }) {
      if (userId) {
        //userIdから変更
      } else if (name) {
        //use nameから変更
        let userObj_update = this.memberObj.list.find((member) => {
          return member.name === name;
        });
        console.log("userObj_update", userObj_update);
        // this.userObj=userObj_update
      } else {
        //none
      }

      console.log("onUserChange this.userObj", this.userObj);
    },

    ///////////////////
    //html call
    //////////////////
    findDisplayPageById(id) {
      return this.leftDrowerList.find((list) => {
        return list.id === id;
      });
    },
    isShowDisplayById(id) {
      // console.log(this.findDisplayPageById(id).isShow);
      return this.findDisplayPageById(id).isShow;
    },

    ///////////////////
    //helper
    //////////////////
    test2(item) {
      // console.log("2", this.queryObj);
      // console.log("2", this.userObj);
      // let tes = this.checkFormValidate(this.subscObj.refName);
      this.$store.dispatch("snackbarState/fire", { message: "fireee" });
      // this.loadingHandler({ isLoading: true, message: "lo-----" });
      // window.setTimeout(() => {
      //   this.loadingHandler({ isLoading: false });
      // }, 3000);
      console.log(this.userObj, this.queryObj);
      // console.log(tes);
      // console.log(this.subscObj);
      // console.log(this.subscObj.uploadFile);
    },

    snackFire({ message, timeout }) {
      this.$store.dispatch("snackbarState/fire", {
        message: message,
        timeout: timeout ? timeout : null,
      });
    },
    loadingHandler({ isLoading, message }) {
      let timeout = 10000;
      this.loadingObj.isLoading = isLoading;
      if (message) {
        this.loadingObj.message = message;
      } else this.loadingObj.message = null;

      if (isLoading) {
        window.setTimeout(() => {
          if (this.loadingObj.isLoading) {
            this.loadingObj.isLoading = false;
            this.snackFire({ message: "timeout error" });
          }
        }, timeout);
      }
    },

    formatDate(date, timeZone, format) {
      if (!format) var format = "yyyy/MM/dd HH:mm";
      format = format.replace(/yyyy/g, date.getFullYear());
      format = format.replace(/MM/g, ("0" + (date.getMonth() + 1)).slice(-2));
      format = format.replace(/dd/g, ("0" + date.getDate()).slice(-2));
      format = format.replace(/HH/g, ("0" + date.getHours()).slice(-2));
      format = format.replace(/mm/g, ("0" + date.getMinutes()).slice(-2));
      format = format.replace(/ss/g, ("0" + date.getSeconds()).slice(-2));
      format = format.replace(
        /SSS/g,
        ("00" + date.getMilliseconds()).slice(-3)
      );
      return format;
    },

    _cp(obj) {
      /**
       * @param {Object,Array} obj ディープコピー
       * undefinedの場合もコピーできるように対応
       */
      if (Array.isArray(obj)) {
        let includeFunction = obj.find((item) => {
          return typeof item === "function";
        });
        if (includeFunction) {
          console.error("関数型の配列はコピーできません。");
          return false;
        } else {
          const currentState = window.history.state;
          window.history.replaceState(obj, null);

          const clone = window.history.state;
          window.history.replaceState(currentState, null);
          return clone;
        }
      } else {
        let keys = Object.keys(obj);
        let includeFunction = keys.find((key) => {
          return typeof obj[key] === "function";
        });

        if (includeFunction) {
          console.error("関数型のオブジェクトはコピーできません。");
          return false;
        } else {
          const currentState = window.history.state;
          window.history.replaceState(obj, null);

          const clone = window.history.state;
          window.history.replaceState(currentState, null);
          return clone;
        }
      }
    },
    ///////////////////
    //subscribe
    //////////////////
    fileInputBtnclick() {
      this.$refs.input.click();
    },
    async selectedFile() {
      this.helper.isLoading = true;

      const file = this.$refs.input.files[0];
      if (!file) {
        return;
      }
    },
    deleteSubscribeList(type, delete_i) {
      switch (type) {
        case "add": {
          this.subscObj.addIsShow[delete_i] = false;
          this.subscObj.addItemNum -= 1; //描画更新
          this.subscObj.addItemNum += 1;
          break;
        }
        case "other": {
          this.subscObj.otherIsShow[delete_i] = false;
          this.subscObj.otherItemNum -= 1; //描画更新
          this.subscObj.otherItemNum += 1;

          break;
        }
        default: {
          console.log(
            "error: type of deleteSubscribeList is only add or other"
          );
        }
      }
    },
    async getBase64(file) {
      return await new FileReaderEx().readAsDataURL(file);
    },
    async submitSubscribe() {
      let isValidate = this.checkFormValidate(this.subscObj.refName);
      let formatSubmitObj_subscribe = () => {
        //initer
        let {
          ATTRIBUTE_LIST,
          //listed
          selectItemArry,
          selectItemPriceArry,
          selectItemNumArry,
          selectPriceTypeArry,

          //追加情報
          addNameArry,
          addPriceArry,
          addNumArry,
          addPriceTypeArry,
          addIsShow,

          //その他情報
          otherNameArry,
          otherPriceArry,
          otherNumArry,
          otherPriceTypeArry,
          otherIsShow,
          memo,
          uploadFile,
        } = this.subscObj;
        let date = new Date();
        let dateUNIX = date.getTime();
        let imageName = this.formatDate(
          date,
          "JST",
          "yyyy_MM_dd_HHhmmminsssec"
        );
        let cnt_show = 0;
        let otherNameArry_sort = otherNameArry.slice();
        let otherPriceArry_sort = otherPriceArry.slice();
        let otherNumArry_sort = otherNumArry.slice();
        let otherPriceTypeArry_sort = otherPriceTypeArry.slice();
        otherIsShow.forEach((isShow, isShow_i) => {
          if (isShow === false) {
            otherNameArry_sort.splice(isShow_i - cnt_show, 1);
            otherPriceArry_sort.splice(isShow_i - cnt_show, 1);
            otherNumArry_sort.splice(isShow_i - cnt_show, 1);
            otherPriceTypeArry_sort.splice(isShow_i - cnt_show, 1);
            cnt_show++;
          }
        });
        cnt_show = 0;
        let addNameArry_sort = addNameArry.slice();
        let addPriceArry_sort = addPriceArry.slice();
        let addNumArry_sort = addNumArry.slice();
        let addPriceTypeArry_sort = addPriceTypeArry.slice();
        addIsShow.forEach((isShow, isShow_i) => {
          if (isShow === false) {
            addNameArry_sort.splice(isShow_i - cnt_show, 1);
            addPriceArry_sort.splice(isShow_i - cnt_show, 1);
            addNumArry_sort.splice(isShow_i - cnt_show, 1);
            addPriceTypeArry_sort.splice(isShow_i - cnt_show, 1);
            cnt_show++;
          }
        });

        let priceArry = selectItemPriceArry.map((price, price_i) => {
          if (
            selectPriceTypeArry[price_i] === this.subscObj.writePriceType[0]
          ) {
            //１個当たりの値段
            return price;
          } else if (
            selectPriceTypeArry[price_i] === this.subscObj.writePriceType[1]
          ) {
            //合計金額
            return price / selectItemNumArry[price_i];
          } else {
            console.error("selectPriceTypeArry does not exist type.");
            return price;
          }
        });
        let priceArry_add = addPriceArry_sort.map((price, price_i) => {
          if (
            addPriceTypeArry_sort[price_i] === this.subscObj.writePriceType[0]
          ) {
            //１個当たりの値段
            return price;
          } else if (
            addPriceTypeArry_sort[price_i] === this.subscObj.writePriceType[1]
          ) {
            //合計金額
            return price / addNumArry_sort[price_i];
          } else {
            console.error("addPriceTypeArry does not exist type.");
            return price;
          }
        });
        let priceArry_other = otherPriceArry_sort.map((price, price_i) => {
          if (
            otherPriceTypeArry_sort[price_i] === this.subscObj.writePriceType[0]
          ) {
            //１個当たりの値段
            return price;
          } else if (
            otherPriceTypeArry_sort[price_i] === this.subscObj.writePriceType[1]
          ) {
            //合計金額
            return price / otherNumArry_sort[price_i];
          } else {
            console.error("otherPriceTypeArry does not exist type.");
            return price;
          }
        });

        //inputer

        //itemArry=[date,attribute,name,price,num,memo,imageName]
        let itemArry = selectItemArry.map((selectItem, select_i) => {
          // let resItem = [
          //   date,
          //   ATTRIBUTE_LIST.LISTED,
          //   selectItem,
          //   priceArry[select_i],
          //   selectItemNumArry[select_i],
          //   memo,
          //   imageName,
          // ];
          let resItem = {
            createAt: dateUNIX,
            submitType: this.submitObj.TYPE.SUBSCRIBE,
            attribute: ATTRIBUTE_LIST.LISTED,
            buyUserId: this.memberObj.selectMemberObj.userId,
            buyUserName: this.memberObj.selectMemberObj.name,
            requestUserIdArry: [this.paymentObj.TYPE.SUBSCRIBE],
            name: selectItem,
            price: priceArry[select_i],
            sumPrice:
              Number(priceArry[select_i]) * Number(selectItemNumArry[select_i]),
            num: selectItemNumArry[select_i],
            memo: memo,
            imageName: imageName,
          };

          return this.formatSubmitObjtoArry(resItem);
        });
        let itemArry_add = addNameArry_sort.map((selectItem, select_i) => {
          // let resItem = [
          //   date,
          //   ATTRIBUTE_LIST.ADD,
          //   selectItem,
          //   priceArry_add[select_i],
          //   addNumArry[select_i],
          //   memo,
          //   imageName,
          // ];
          // let resItem = {
          //   date: dateUNIX,
          //   attribute: ATTRIBUTE_LIST.ADD,
          //   name: selectItem,
          //   price: priceArry_add[select_i],
          //   num: addNumArry[select_i],
          //   memo: memo,
          //   imageName: imageName,
          // };
          let resItem = {
            createAt: dateUNIX,
            submitType: this.submitObj.TYPE.SUBSCRIBE,
            attribute: ATTRIBUTE_LIST.ADD,
            buyUserId: this.memberObj.selectMemberObj.userId,
            buyUserName: this.memberObj.selectMemberObj.name,
            requestUserIdArry: [this.paymentObj.TYPE.SUBSCRIBE],
            date: dateUNIX,
            name: selectItem,
            price: priceArry_add[select_i],
            sumPrice:
              Number(priceArry_add[select_i]) *
              Number(addNumArry_sort[select_i]),
            num: addNumArry_sort[select_i],
            memo: memo,
            imageName: imageName,
          };

          return this.formatSubmitObjtoArry(resItem);
        });

        let itemArry_other = otherNameArry_sort.map((selectItem, select_i) => {
          // let resItem = [
          //   date,
          //   ATTRIBUTE_LIST.OTHER,
          //   selectItem,
          //   priceArry_other[select_i],
          //   otherNumArry[select_i],
          //   memo,
          //   imageName,
          // ];
          // let resItem = {
          //   date: dateUNIX,
          //   attribute: ATTRIBUTE_LIST.OTHER,
          //   name: selectItem,
          //   price: priceArry_other[select_i],
          //   num: otherNumArry[select_i],
          //   memo: memo,
          //   imageName: imageName,
          // };
          let resItem = {
            createAt: dateUNIX,
            submitType: this.submitObj.TYPE.SUBSCRIBE,
            attribute: ATTRIBUTE_LIST.OTHER,
            buyUserId: this.memberObj.selectMemberObj.userId,
            buyUserName: this.memberObj.selectMemberObj.name,
            requestUserIdArry: [this.paymentObj.TYPE.SUBSCRIBE],

            date: dateUNIX,
            name: selectItem,
            price: priceArry_other[select_i],
            sumPrice:
              Number(priceArry_other[select_i]) *
              Number(otherNumArry_sort[select_i]),
            num: otherNumArry_sort[select_i],
            memo: memo,
            imageName: imageName,
          };

          return this.formatSubmitObjtoArry(resItem);
        });

        let formattedArry = itemArry
          .concat(itemArry_add)
          .concat(itemArry_other);

        return formattedArry;
      };
      if (isValidate) {
        this.loadingHandler({ isLoading: true, message: "送信中..." });

        let formatObj = formatSubmitObj_subscribe();
        let imageDataObj = {
          base64: await this.getBase64(this.subscObj.uploadFile),
          name: formatObj[0][13],
        };
        console.log(formatObj, imageDataObj);
        let success = () => {
          this.loadingHandler({ isLoading: false });
          this.snackFire({ message: "送信しました。" });
        };
        google.script.run
          .withSuccessHandler(success)
          .getPost_subscribe(formatObj, imageDataObj);
      } else {
        this.snackFire({
          message: "必要な情報を入力してください。",
        });
      }
    },

    ///////////////////
    //form
    //////////////////
    formatSubmitObjtoArry(obj) {
      // let template = {
      //   createAt,
      //   deleteAt,
      //   updateAt,
      //   attribute,
      //   buyUserId,
      //   requestUserIdArry,
      //   name,
      //   num,
      //   price,
      //   sumPrice,
      //   memo,
      //   imageName,
      // };
      let template = this._cp(this.submitObj.template);
      let keyArry = Object.keys(template);
      keyArry.forEach((key) => {
        if (!obj[key]) obj[key] = template[key];
      });
      let resArry = keyArry.map((key) => {
        if (typeof obj[key] !== "string") return String(obj[key]);
        return obj[key];
      });

      return resArry;
    },
    checkFormValidate(refName) {
      //v-formを用いた場合はこれでvalidateをチェックする
      //https://qiita.com/tekunikaruza_jp/items/0a68d86084d961d632ac
      return this.$refs[refName].validate();
    },
  },
};
</script>
<style lang="scss">
.semi-disable {
  background-color: lightgray;
}
.subscribe-card {
  width: 90%;
}

#subscribe {
  .v-application--wrap {
    display: flex;
    align-items: center;
  }
  .photo-upload-title {
    display: flex;
    justify-content: space-around;
  }
  .photo-upload-container {
    display: flex;
    justify-content: center;
  }
  .submit-container {
    display: flex;
    justify-content: center;
  }

  .select-subscribe-title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: x-large;
    font-weight: bold;
    text-decoration: underline;
  }
  .additional-list-btn-container {
    display: flex;
    justify-content: space-around;
  }

  .delete-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

#LoadingContainer {
  // display: flex;

  max-width: 100%;
  height: 100vh;
  z-index: 9999;
  position: fixed;
  background-color: rgba(#000, 0.8);
  color: white;
  .circular {
    padding-top: 30vh;
  }
  .col {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .v-progress-circular {
    height: 20vw !important;
    width: 20vw !important;
  }
  .message {
    font-size: 3rem;
  }
}
</style>
