<template>
  <div id="deal">
    <!-- :sort-by="['calories', 'fat']"
    :sort-desc="[false, true]"
    multi-sort -->
    <v-app>
      <v-card class="deal-card">
        <v-select
          v-model="userObj_temp.selectUserObj_temp"
          :items="userObj_temp.list"
          item-text="name"
          item-value="userId"
          label="表示中の人"
          chips
          hint="異なる場合は選択してください。"
          return-object
          @input="initDealDisplayList"
        >
        </v-select>
        <v-data-table
          :headers="dealObj.tableHeaders"
          :items="dealObj.displayList"
          class="elevation-1"
          :sort-by="['payment_price', 'receive_price']"
          :sort-desc="[true, true]"
          :calculate-widths="true"
          mobile-breakpoint="370"
          :loading="dealObj.isLoading"
          loading-text="Loading... Please wait"
        >
          <template v-slot:item.payment_price="{ item }">
            <v-chip
              :color="
                getDealDisplayColor({
                  type: dealObj.TYPE.PAYMENT,
                  value: item.payment_price,
                })
              "
              dark
            >
              {{ item.payment_price }}
            </v-chip>
          </template>

          <template v-slot:item.receive_price="{ item }">
            <v-chip
              :color="
                getDealDisplayColor({
                  type: dealObj.TYPE.RECEIVE,
                  value: item.receive_price,
                })
              "
              dark
            >
              {{ item.receive_price }}
            </v-chip>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon v-if="item.payment_price > 0" @click="paymentAction(item)">
              mdi-credit-card
            </v-icon>
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
    };
  },
  mounted() {
    this.initDealDisplayList();
    this.dealObj.isLoading = false;
  },
  created() {},
  watch: {},
  computed: {},
  methods: {
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
      //////////////////////////
      /////////only .vue/////////////
      //////////////////////////

      dealPersonList.paymentList = dealPersonList.paymentList.map((list) => {
        list.type = "PAYMENT";
        return list;
      });
      dealPersonList.receiveList = dealPersonList.receiveList.map((list) => {
        list.type = "RECEIVE";
        return list;
      });

      //////////////////////////
      //////////////////////////
      //////////////////////////
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
    paymentAction(item) {
      console.log(item);
      //お金を渡しっときのフォーム
      window.location.href =
        "https://docs.google.com/forms/d/e/1FAIpQLScEsud7xV_KfqEWiVFgOSG1VBfLu8hHa-zLmnh0_Ymv4Iv_6A/viewform";
    },
    getDealDisplayColor({ type, value }) {
      console.log("getDealDisplayColor", type, value);
      let resColor = "";
      if (value > 0) {
        switch (type) {
          case this.dealObj.TYPE.PAYMENT: {
            resColor = "red";
            break;
          }
          case this.dealObj.TYPE.RECEIVE: {
            resColor = "green";
            break;
          }
        }
      }
      return resColor;
    },
  },
};
</script>

<style lang="scss">
.deal-card {
  width: 100%;
}
.v-application--wrap {
  display: flex;
  align-items: center;
}
</style>
