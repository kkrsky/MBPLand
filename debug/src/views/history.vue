<template>
  <div id="history">
    <!-- :sort-by="['calories', 'fat']"
    :sort-desc="[false, true]"
    multi-sort -->
    <v-app>
      <v-card class="history-card">
        <v-select
          v-model="userObj_temp.selectUserObj_temp"
          :items="userObj_temp.list"
          item-text="name"
          item-value="userId"
          label="表示中の人"
          chips
          hint="異なる場合は選択してください。"
          return-object
          @input="initHistoryDisplayList"
        >
        </v-select>
        <!-- :sort-by="['', '']"
          :sort-desc="[true, true]" -->
        <v-data-table
          item-key="id"
          :headers="historyObj.tableHeaders"
          :items="historyObj.displayList"
          class="elevation-1"
          :calculate-widths="true"
          mobile-breakpoint="370"
          :loading="historyObj.isLoading"
          loading-text="Loading... Please wait"
          :expanded="expanded"
          show-expand
          @click:row="expandRow"
        >
          <template v-slot:item.price="{ item }">
            <v-chip>
              {{ item.price }}
            </v-chip>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <v-container :colspan="headers.length" class="expand-container">
                <v-row>
                  <v-col class="expand-small">{{
                    formatDate(item.createAt, "JST", "yyyy/MM/dd")
                  }}</v-col>
                  <v-col class="expand-title">{{ item.submitType }}</v-col>
                  <v-col
                    ><div v-if="item.imageUrl.split('http').length > 1">
                      <v-icon @click="test">mdi-map</v-icon>
                    </div>
                  </v-col>
                </v-row>
                <v-divider></v-divider>

                <v-row>
                  <v-col>{{ item.name }}</v-col>
                  <v-col
                    ><v-chip>{{ item.price }}</v-chip> 円</v-col
                  >
                </v-row>
                <v-divider></v-divider>
                <v-row>
                  <v-col>{{ item.buyUserName }}</v-col>
                  <v-col cols="2"
                    ><v-icon>mdi-arrow-left-bold-circle</v-icon></v-col
                  >
                  <v-col>
                    <v-container v-if="!Array.isArray(item.requestUserName)">
                      <v-row>{{ item.requestUserName }}</v-row>
                    </v-container>
                    <v-container v-if="Array.isArray(item.requestUserName)">
                      <v-row
                        v-for="requestUserName in item.requestUserName"
                        :key="requestUserName"
                        >{{ requestUserName }}</v-row
                      >
                    </v-container></v-col
                  >
                  <!-- <table border="0">
                      <tbody>
                        <tr>
                          <td>内容1</td>
                        </tr>
                        <tr>
                          <td>内容1</td>
                        </tr>
                      </tbody>
                    </table> -->
                </v-row>
                <v-divider></v-divider>
                <v-row class="expand-memo-container">
                  <v-col>{{ item.memo }}</v-col>
                  <p class="expand-small">メモ</p>
                </v-row>
              </v-container>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      expanded: [],
      userObj: {
        name: "Guest",
        userId: "Guest",
      },
      userObj_temp: {
        list: [
          { name: "しあり", userId: "0", person_i_temp: 0 },
          { name: "くれ", userId: "1", person_i_temp: 1 },
          { name: "まどか", userId: "2", person_i_temp: 2 },
          { name: "みく", userId: "3", person_i_temp: 3 },
          { name: "ななみ", userId: "4", person_i_temp: 4 },
          { name: "なるみ", userId: "5", person_i_temp: 5 },
          { name: "れい", userId: "6", person_i_temp: 6 },
          // { name: "Guest", userId: "Guest", person_i_temp: -1 },
        ],
        selectUserObj_temp: { name: "しあり", userId: "0", person_i_temp: 0 },
      },

      dealObj: {
        isLoading: true,
        list: [
          {
            name: null,
            userId: null,
            person_i_temp: 0,
            name_temp: "しあり",
            paymentList: [
              {
                name: null,
                userId: null,
                name_temp: "しあり",
                person_i_temp: 0,
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "くれ",
                person_i_temp: 1,
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "まどか",
                person_i_temp: 2,
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "みく",
                person_i_temp: 3,
                price: 10938,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "ななみ",
                person_i_temp: 4,
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "なるみ",
                person_i_temp: 5,
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "れいちゃん",
                person_i_temp: 6,
                price: 0,
                info: "",
              },
            ],
            receiveList: [
              {
                name: null,
                userId: null,
                person_i_temp: 0,
                name_temp: "しあり",
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 1,
                name_temp: "くれ",
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 2,
                name_temp: "まどか",
                price: 9053,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 3,
                name_temp: "みく",
                price: 20086,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 4,
                name_temp: "ななみ",
                price: 2663,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 5,
                name_temp: "なるみ",
                price: 2663,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 6,
                name_temp: "れいちゃん",
                price: 0,
                info: "",
              },
            ],
          },
          {
            name: null,
            userId: null,
            person_i_temp: 1,
            name_temp: "くれ",
            paymentList: [
              {
                name: null,
                userId: null,
                name_temp: "しあり",
                person_i_temp: 0,
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "くれ",
                person_i_temp: 1,
                price: 6,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "まどか",
                person_i_temp: 2,
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "みく",
                person_i_temp: 3,
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "ななみ",
                person_i_temp: 4,
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "なるみ",
                person_i_temp: 5,
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "れいちゃん",
                person_i_temp: 6,
                price: 0,
                info: "",
              },
            ],
            receiveList: [
              {
                name: null,
                userId: null,
                person_i_temp: 0,
                name_temp: "しあり",
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 1,
                name_temp: "くれ",
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 2,
                name_temp: "まどか",
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 3,
                name_temp: "みく",
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 4,
                name_temp: "ななみ",
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 5,
                name_temp: "なるみ",
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 6,
                name_temp: "れいちゃん",
                price: 0,
                info: "",
              },
            ],
          },
          {
            name: null,
            userId: null,
            person_i_temp: 2,
            name_temp: "まどか",
            paymentList: [
              {
                name: null,
                userId: null,
                name_temp: "しあり",
                person_i_temp: 0,
                price: 9053,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "くれ",
                person_i_temp: 1,
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "まどか",
                person_i_temp: 2,
                price: 1,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "みく",
                person_i_temp: 3,
                price: 3252,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "ななみ",
                person_i_temp: 4,
                price: 1177,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "なるみ",
                person_i_temp: 5,
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "れいちゃん",
                person_i_temp: 6,
                price: 0,
                info: "",
              },
            ],
            receiveList: [
              {
                name: null,
                userId: null,
                person_i_temp: 0,
                name_temp: "しあり",
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 1,
                name_temp: "くれ",
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 2,
                name_temp: "まどか",
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 3,
                name_temp: "みく",
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 4,
                name_temp: "ななみ",
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 5,
                name_temp: "なるみ",
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 6,
                name_temp: "れいちゃん",
                price: 0,
                info: "",
              },
            ],
          },
          {
            name: null,
            userId: null,
            person_i_temp: 3,
            name_temp: "みく",
            paymentList: [
              {
                name: null,
                userId: null,
                name_temp: "しあり",
                person_i_temp: 0,
                price: 20086,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "くれ",
                person_i_temp: 1,
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "まどか",
                person_i_temp: 2,
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "みく",
                person_i_temp: 3,
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "ななみ",
                person_i_temp: 4,
                price: 621,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "なるみ",
                person_i_temp: 5,
                price: 362,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "れいちゃん",
                person_i_temp: 6,
                price: 0,
                info: "",
              },
            ],
            receiveList: [
              {
                name: null,
                userId: null,
                person_i_temp: 0,
                name_temp: "しあり",
                price: 10938,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 1,
                name_temp: "くれ",
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 2,
                name_temp: "まどか",
                price: 3252,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 3,
                name_temp: "みく",
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 4,
                name_temp: "ななみ",
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 5,
                name_temp: "なるみ",
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 6,
                name_temp: "れいちゃん",
                price: 0,
                info: "",
              },
            ],
          },
          {
            name: null,
            userId: null,
            person_i_temp: 4,
            name_temp: "ななみ",
            paymentList: [
              {
                name: null,
                userId: null,
                name_temp: "しあり",
                person_i_temp: 0,
                price: 2663,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "くれ",
                person_i_temp: 1,
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "まどか",
                person_i_temp: 2,
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "みく",
                person_i_temp: 3,
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "ななみ",
                person_i_temp: 4,
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "なるみ",
                person_i_temp: 5,
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "れいちゃん",
                person_i_temp: 6,
                price: 0,
                info: "",
              },
            ],
            receiveList: [
              {
                name: null,
                userId: null,
                person_i_temp: 0,
                name_temp: "しあり",
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 1,
                name_temp: "くれ",
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 2,
                name_temp: "まどか",
                price: 1177,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 3,
                name_temp: "みく",
                price: 621,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 4,
                name_temp: "ななみ",
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 5,
                name_temp: "なるみ",
                price: 621,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 6,
                name_temp: "れいちゃん",
                price: 0,
                info: "",
              },
            ],
          },
          {
            name: null,
            userId: null,
            person_i_temp: 5,
            name_temp: "なるみ",
            paymentList: [
              {
                name: null,
                userId: null,
                name_temp: "しあり",
                person_i_temp: 0,
                price: 2663,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "くれ",
                person_i_temp: 1,
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "まどか",
                person_i_temp: 2,
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "みく",
                person_i_temp: 3,
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "ななみ",
                person_i_temp: 4,
                price: 621,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "なるみ",
                person_i_temp: 5,
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "れいちゃん",
                person_i_temp: 6,
                price: 0,
                info: "",
              },
            ],
            receiveList: [
              {
                name: null,
                userId: null,
                person_i_temp: 0,
                name_temp: "しあり",
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 1,
                name_temp: "くれ",
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 2,
                name_temp: "まどか",
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 3,
                name_temp: "みく",
                price: 362,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 4,
                name_temp: "ななみ",
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 5,
                name_temp: "なるみ",
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 6,
                name_temp: "れいちゃん",
                price: 0,
                info: "",
              },
            ],
          },
          {
            name: null,
            userId: null,
            person_i_temp: 6,
            name_temp: "れいちゃん",
            paymentList: [
              {
                name: null,
                userId: null,
                name_temp: "しあり",
                person_i_temp: 0,
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "くれ",
                person_i_temp: 1,
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "まどか",
                person_i_temp: 2,
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "みく",
                person_i_temp: 3,
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "ななみ",
                person_i_temp: 4,
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "なるみ",
                person_i_temp: 5,
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                name_temp: "れいちゃん",
                person_i_temp: 6,
                price: 0,
                info: "",
              },
            ],
            receiveList: [
              {
                name: null,
                userId: null,
                person_i_temp: 0,
                name_temp: "しあり",
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 1,
                name_temp: "くれ",
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 2,
                name_temp: "まどか",
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 3,
                name_temp: "みく",
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 4,
                name_temp: "ななみ",
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 5,
                name_temp: "なるみ",
                price: 0,
                info: "",
              },
              {
                name: null,
                userId: null,
                person_i_temp: 6,
                name_temp: "れいちゃん",
                price: 0,
                info: "",
              },
            ],
          },
        ],
        displayList: [],
        tableHeaders: [
          {
            text: "名前",
            sortable: false,
            value: "name",
          },
          { text: "支払", value: "payment_price" },
          { text: "受取", value: "receive_price" },
          { text: "", value: "actions", sortable: false },
        ],

        TYPE: { PAYMENT: "PAYMENT", RECEIVE: "RECEIVE", ADMIN: "ADMIN" },
      },
      historyObj: {
        isLoading: false,
        list: [],
        displayList: [],
        tableHeaders: [
          {
            text: "登録者",
            sortable: false,
            value: "buyUserName",
          },
          {
            text: "内容",
            sortable: false,
            value: "name",
          },
          {
            text: "値段",
            sortable: false,
            value: "price",
          },
          { text: "", value: "data-table-expand" },
        ],
      },
    };
  },
  mounted() {
    this.initHistoryDisplayList();
    this.dealObj.isLoading = false;
    this.initHistoryObj();
    this.initHistoryDisplayList();
  },
  created() {},
  watch: {},
  computed: {},
  methods: {
    test() {
      window.open("https://forsmile.jp/vue/1352/");
    },
    initDealDisplayList() {
      let checkUser = () => {
        let result = this.dealObj.list.find((personObj) => {
          let { userId } = personObj;
          return userId === this.userObj.userId;
        });
        if (!result) {
          //userIdがマッチしない
          result = false;
        }
        return result;
      };
      let isUser = checkUser();
      let dealPersonList = [];
      if (isUser) {
        dealPersonList = this.dealObj.list[isUser.person_i_temp];
      } else {
        let person_i_temp = this.userObj_temp.selectUserObj_temp.person_i_temp;
        dealPersonList = this.dealObj.list[person_i_temp];
      }

      /////////////////////
      /////////////////////
      /////////////////////
      let dealList = dealPersonList.paymentList.concat(
        dealPersonList.receiveList
      );
      console.log("displayList", dealList);

      let displayList = [];
      dealList.forEach((deal) => {
        let { name, userId, type, name_temp, person_i_temp, price } = deal;
        if (!displayList[person_i_temp]) {
          name = name_temp;
          displayList[person_i_temp] = {
            name,
            userId,
            person_i_temp,
            payment_price: 0,
            receive_price: 0,
            button: "",
          };
        }
        switch (type) {
          case this.dealObj.TYPE.PAYMENT: {
            displayList[person_i_temp].payment_price = price;
            if (price > 0) {
              displayList[person_i_temp].button = "<v-btn>test</v-btn>";
            }
            break;
          }
          case this.dealObj.TYPE.RECEIVE: {
            displayList[person_i_temp].receive_price = price;
            break;
          }
        }
      });
      console.log("personArry", displayList);
      this.dealObj.displayList = displayList;
    },
    initHistoryDisplayList() {
      this.historyObj.displayList = this.historyObj.list;
    },
    initHistoryObj() {
      let historySheetDataArry_demo =
        '{"sheetName":"deal_form","dataLabelArry":["id","createAt","deleteAt","updateAt","submitType","attribute","buyUserId","buyUserName","requestUserId","requestUserName","name","num","price","sumPrice","memo","imageName","imageUrl"],"sheetDataArry":[[1,1627914759503,"","","SUBSCRIBE","LISTED","U908d37a8e2f8d8ccf51edcf44ddbffd1","紅林 亮平","SUBSCRIBE",["SUBSCRIBE","SUBSCRIBE1","SUBSCRIBE2","SUBSCRIBE3"],"米",5,4000,220,"b年月日のうち月日のみを抽出するやり方を調べたけどいい感じのが見つからず、.slice()が簡単な気がきました年月日のうち月日のみを抽出するやり方を調べたけどいい感じのが見つからず、.slice()が簡単な気がきました年月日のうち月日のみを抽出するやり方を調べたけどいい感じのが見つからず、.slice()が簡単な気がきました","2021_08_02_23h32min39sec","d/1y35PeK5rU9uBBn3msO68SQhvyuQWej-w/view?usp=drivesdk"],[2,1627914759503,"","","SUBSCRIBE","ADD","U908d37a8e2f8d8ccf51edcf44ddbffd1","紅林 亮平","SUBSCRIBE","SUBSCRIBE","a",4,4,16,"b","2021_08_02_23h32min39sec","https://drive.google.com/file/d/1y35PeK5rU9uBBn3msO68SQhvyuQWej-w/view?usp=drivesdk"],[3,1627914759503,"","","SUBSCRIBE","OTHER","U908d37a8e2f8d8ccf51edcf44ddbffd1","紅林 亮平","SUBSCRIBE","SUBSCRIBE","v",5,4,20,"b","2021_08_02_23h32min39sec","https://drive.google.com/file/d/1y35PeK5rU9uBBn3msO68SQhvyuQWej-w/view?usp=drivesdk"],[4,1627914817325,"","","SUBSCRIBE","LISTED","U908d37a8e2f8d8ccf51edcf44ddbffd1","紅林 亮平","SUBSCRIBE","SUBSCRIBE","米",5,44,220,"b","2021_08_02_23h33min37sec","https://drive.google.com/file/d/1p_I8fdsSWC7nI8t8b_BZVw2hv5Ar7WUe/view?usp=drivesdk"],[5,1627914817325,"","","SUBSCRIBE","ADD","U908d37a8e2f8d8ccf51edcf44ddbffd1","紅林 亮平","SUBSCRIBE","SUBSCRIBE","a",4,4,16,"b","2021_08_02_23h33min37sec","https://drive.google.com/file/d/1p_I8fdsSWC7nI8t8b_BZVw2hv5Ar7WUe/view?usp=drivesdk"],[6,1627914817325,"","","SUBSCRIBE","OTHER","U908d37a8e2f8d8ccf51edcf44ddbffd1","紅林 亮平","SUBSCRIBE","SUBSCRIBE","v",5,4,20,"b","2021_08_02_23h33min37sec","https://drive.google.com/file/d/1p_I8fdsSWC7nI8t8b_BZVw2hv5Ar7WUe/view?usp=drivesdk"]]}';

      let historySheetDataArry;
      // let historySheetDataArry = await gasFunc("getHistoryList");
      historySheetDataArry = JSON.parse(historySheetDataArry_demo);
      let { sheetName, dataLabelArry, sheetDataArry } = historySheetDataArry;
      this.historyObj.list = sheetDataArry.map((dataArry) => {
        let obj = {};
        dataLabelArry.forEach((key, key_i) => {
          obj[key] = dataArry[key_i];
        });
        return obj;
      });
      console.log("this.historyObj", this.historyObj);
    },
    expandRow(item) {
      this.expanded = item === this.expanded[0] ? [] : [item];
    },

    //utils
    formatDate(date, timeZone, format) {
      date = new Date(date);
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
  },
};
</script>

<style lang="scss">
#history {
  width: 100%;
  .v-data-footer__pagination {
    margin: auto;
  }
  .v-application--wrap {
    display: flex;
    align-items: center;
  }
  .history-card {
    width: 100%;
  }
  .expand-container {
    width: 100%;
    .expand-title {
      font-weight: bold;
    }
    .expand-small {
      font-size: 0.75rem;
    }
    .expand-memo-container {
      position: relative;
      .col {
        margin: 0 0 0 2rem;
      }
      p {
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .col {
      padding: 5px 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      .container {
        padding: 0;
        .row {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>
