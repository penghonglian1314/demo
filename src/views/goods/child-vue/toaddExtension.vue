<template>
  <el-container style=" height:100%">
    <el-main>
      <el-form ref="addForm" :model="addForm" :rules="rules" class="demo-form-inline" size="medium" label-position="right" label-width="100px">
        <!-- 基础信息 -->
        <el-card class="topNews">
          <el-row class="steps">
            <div class="newsDetail">添加-----商品</div>
            <div class="button">
              <el-button style="margin-left:350%" @click="goBack">返回</el-button>
            </div>
          </el-row>
        </el-card>
        <el-card class="baseNews">
          <el-row type="flex" class="row-bg">
            <el-col :span="24" align="middle"><h3>添加商品信息</h3></el-col>
          </el-row>

          <!-- 扩展信息 -->

          <el-row>
            <el-col :span="9">
              <el-form-item label="购车时间：" prop="ShoppingTimeYears">
                <el-select v-model="addForm.ShoppingTimeYears" placeholder="请选择年份：" :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in ShoppingTimeYearsOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label-width="-240px" label="" prop="ShoppingTimeMonth">
                <el-select v-model="addForm.ShoppingTimeMonth" placeholder="请选月份：" :style="{width: '40%'}">
                  <el-option
                    v-for="(item, index) in ShoppingTimeMonthOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="行驶里程：" prop="DriveDistance">
                <el-select v-model="addForm.DriveDistance" placeholder="请选行驶里程：" :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in DriveDistanceOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="变速箱：" prop="Transmission">
                <el-select v-model="addForm.Transmission" placeholder="请选变速箱：" :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in TransmissionOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="过户次数：" prop="ChangeNumber">
                <el-select v-model="addForm.ChangeNumber" placeholder="请选过户次数：" :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in ChangeNumberOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="排放量：" prop="Emissions">
                <el-input v-model="addForm.Emissions" placeholder="请选排放量：" :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="排放标准：" prop="EmissionStandards">
                <el-select v-model="addForm.EmissionStandards" placeholder="请选排放标准：" :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in EmissionStandardsOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="国别：" prop="Country">
                <el-select v-model="addForm.Country" placeholder="请选国别：" :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in CountryOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="能源类型：" prop="EnergyType">
                <el-select v-model="addForm.EnergyType" placeholder="请选能源类型：" :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in EnergyTypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="座位：" prop="Seat">
                <el-select v-model="addForm.Seat" placeholder="请选座位：" :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in SeatOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="附加配置：" prop="AdditionalConfiguration">
              <el-checkbox-group v-model="addForm.AdditionalConfiguration_s" size="medium">
                <el-checkbox-button
                  v-for="(item, index) in AdditionalConfigurationOptions"
                  :key="index"
                  :label="item.value"
                  :disabled="item.disabled"
                >{{ item.label }}</el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="驱动类型：" prop="DriveType">
                <el-select v-model="addForm.DriveType" placeholder="请选驱动类型：" :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in DriveTypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="进气类型：" prop="AirIntakeType">
                <el-select v-model="addForm.AirIntakeType" placeholder="请选进气类型：" :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in AirIntakeTypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="车身类型：" prop="BodyType">
                <el-select v-model="addForm.BodyType" placeholder="请选车身类型：" :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in BodyTypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="车身颜色：" prop="Color" label-width="160px">
                <el-select v-model="addForm.Color" placeholder="请选择车身颜色：" clearable :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in ColorOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="厂商：" prop="Vendor" label-width="160px">
                <el-input v-model="addForm.Vendor" placeholder="请输入厂商：" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="发动机：" prop="Engine" label-width="160px">
                <el-input v-model="addForm.Engine" placeholder="请输入发动机参数 如：1.6L/110马力/L4" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="变速箱：" prop="TransmissionModel" label-width="160px">
                <el-input v-model="addForm.TransmissionModel" placeholder="请输入变速箱参数 如：10挡手自一体" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="车身结构：" prop="BodyStructure" label-width="160px">
                <el-input v-model="addForm.BodyStructure" placeholder="请输入车身结构 如：4门5座三厢车" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="长宽高：" prop="LengthWidthHeight" label-width="160px">
                <el-input v-model="addForm.LengthWidthHeight" placeholder="请输入长宽高(mm)如 5223/1879/1498" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="轴距：" prop="Wheelbase" label-width="160px">
                <el-input v-model="addForm.Wheelbase" placeholder="请输入轴距(mm)" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="行李箱容积：" prop="TrunkCapacity" label-width="160px">
                <el-input v-model="addForm.TrunkCapacity" placeholder="请输入行李箱容积(L)" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="整备质量：" prop="CurbWeight" label-width="160px">
                <el-input v-model="addForm.CurbWeight" placeholder="请输入整备质量(KG)" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="气缸数：" prop="NumberOfCylinders" label-width="160px">
                <el-input v-model="addForm.NumberOfCylinders" placeholder="请输入气缸数" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="最大马力：" prop="MaximumHorsepower" label-width="160px">
                <el-input v-model="addForm.MaximumHorsepower" placeholder="请输入最大马力(PS)" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="最大扭矩：" prop="MaximumTorque" label-width="160px">
                <el-input v-model="addForm.MaximumTorque" placeholder="请输入最大扭矩(N*m)" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="燃油标号：" prop="FuelLabel" label-width="160px">
                <el-input v-model="addForm.FuelLabel" placeholder="请输入燃油标号 如：92# 95#" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="供油方式：" prop="OilSupplyWay" label-width="160px">
                <el-input v-model="addForm.OilSupplyWay" placeholder="请输入供油方式" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="助力类型：" prop="PowerType" label-width="160px">
                <el-input v-model="addForm.PowerType" placeholder="请输入助力类型 如：电子助力" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="驱车制动类型：" prop="DrivingBrakeType" label-width="160px">
                <el-input v-model="addForm.DrivingBrakeType" placeholder="请输入驱车制动类型" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="前悬挂类型：" prop="FrontSuspensionType" label-width="160px">
                <el-input v-model="addForm.FrontSuspensionType" placeholder="请输入前悬挂类型" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="后悬挂类型：" prop="RearSuspensionType" label-width="160px">
                <el-input v-model="addForm.RearSuspensionType" placeholder="请输入后悬挂类型" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="前制动类型：" prop="FrontBrakeType" label-width="160px">
                <el-input v-model="addForm.FrontBrakeType" placeholder="请输入前制动类型" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="后制动类型：" prop="RearBrakeType" label-width="160px">
                <el-input v-model="addForm.RearBrakeType" placeholder="请输入后制动类型" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="前轮胎规格：" prop="FrontTireSpecification" label-width="160px">
                <el-input v-model="addForm.FrontTireSpecification" placeholder="请输入前轮胎规格" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="后轮胎规格：" prop="RearTireSpecification" label-width="160px">
                <el-input v-model="addForm.RearTireSpecification" placeholder="请输入后轮胎规格" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="主/副驾驶安全气囊：" prop="MainCoPilotAirbag" label-width="160px">
                <el-select v-model="addForm.MainCoPilotAirbag" placeholder="请输入主/副驾驶安全气囊" clearable :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in Options_s"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="前/后排侧气囊：" prop="FrontRearSideAirbag" label-width="160px">
                <el-select v-model="addForm.FrontRearSideAirbag" placeholder="请输入前/后排侧气囊" clearable :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in Options_s"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="前/后排头部气囊：" prop="FrontRearHeadAirbag" label-width="160px">
                <el-select v-model="addForm.FrontRearHeadAirbag" placeholder="请输入前/后排头部气囊" clearable :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in Options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="胎压检测：" prop="TirePressureDetection" label-width="160px">
                <el-select v-model="addForm.CentralControlLockInTheCar" placeholder="请输入车内中控锁" clearable :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in Options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="车内中控锁：" prop="CentralControlLockInTheCar" label-width="160px">
                <el-select v-model="addForm.CentralControlLockInTheCar" placeholder="请输入车内中控锁" clearable :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in Options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="儿童座椅接口：" prop="ChildSeatInterface" label-width="160px">
                <el-select v-model="addForm.ChildSeatInterface" placeholder="请输入儿童座椅接口" clearable :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in Options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="无钥匙启动：" prop="KeylessStart" label-width="160px">
                <el-select v-model="addForm.KeylessStart" placeholder="请输入无钥匙启动" clearable :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in Options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="防抱死系统(ABS)：" prop="ABS" label-width="160px">
                <el-select v-model="addForm.ABS" placeholder="请输入防抱死系统(ABS)" clearable :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in Options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="车身稳定控制(ESP)：" prop="ESP" label-width="160px">
                <el-select v-model="addForm.ESP" placeholder="请输入车身稳定控制(ESP)" clearable :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in Options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电动天窗：" prop="PowerSunroof" label-width="160px">
                <el-select v-model="addForm.PowerSunroof" placeholder="请输入电动天窗" clearable :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in Options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="全景天窗：" prop="PanoramicSunroof" label-width="160px">
                <el-select v-model="addForm.PanoramicSunroof" placeholder="请输入全景天窗" clearable :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in Options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电动吸合门：" prop="ElectricSuctionDoor" label-width="160px">
                <el-select v-model="addForm.ElectricSuctionDoor" placeholder="请输入电动吸合门" clearable :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in Options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="感应后备箱：" prop="InductionTrunk" label-width="160px">
                <el-select v-model="addForm.InductionTrunk" placeholder="请输入感应后备箱" clearable :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in Options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="感应雨刷：" prop="SensingWindshieldWiper" label-width="160px">
                <el-select v-model="addForm.SensingWindshieldWiper" placeholder="请输入感应雨刷" clearable :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in Options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="后雨刷：" prop="AfterTheWindshieldWiper" label-width="160px">
                <el-select v-model="addForm.AfterTheWindshieldWiper" placeholder="请输入后雨刷" clearable :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in Options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="前/后电动车窗：" prop="FrontRearElectricWindows" label-width="160px">
                <el-select v-model="addForm.FrontRearElectricWindows" placeholder="请输入前/后电动车窗" clearable :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in Options_s"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="后视镜电动调节：" prop="ElectricRearviewMirrorAdjustment" label-width="160px">
                <el-select v-model="addForm.RearviewMirrorHeating" placeholder="请输入后视镜加热" clearable :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in Options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="后视镜加热：" prop="RearviewMirrorHeating" label-width="160px">
                <el-select v-model="addForm.RearviewMirrorHeating" placeholder="请输入后视镜加热" clearable :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in Options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="多功能方向盘：" prop="MultiFunctionSteeringWheel" label-width="160px">
                <el-select v-model="addForm.MultiFunctionSteeringWheel" placeholder="请输入多功能方向盘" clearable :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in Options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="定速巡航：" prop="CruiseControl" label-width="160px">
                <el-select v-model="addForm.CruiseControl" placeholder="请输入定速巡航" clearable :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in Options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="后排独立空调：" prop="RearIndependentAirConditioner" label-width="160px">
                <el-select v-model="addForm.RearIndependentAirConditioner" placeholder="请输入后排独立空调" clearable :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in Options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="空调控制方式：" prop="AirConditioningControlMode" label-width="160px">
                <el-select v-model="addForm.AirConditioningControlMode" placeholder="请输入空调控制方式" clearable :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in AirConditionerOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="GPS导航：" prop="GPS" label-width="160px">
                <el-select v-model="addForm.GPS" placeholder="请输入GPS导航" clearable :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in Options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="倒车雷达：" prop="ReversingRadar" label-width="160px">
                <el-select v-model="addForm.ReversingRadar" placeholder="请输入倒车雷达" clearable :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in Options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="倒车影像系统：" prop="AsternImagingSystem" label-width="160px">
                <el-select v-model="addForm.AsternImagingSystem" placeholder="请输入倒车影像系统" clearable :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in Options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="真皮座椅：" prop="LeatherSeats" label-width="160px">
                <el-select v-model="addForm.LeatherSeats" placeholder="请输入真皮座椅" clearable :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in Options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="前/后排座椅加热：" prop="FrontRearSeatsHeated" label-width="160px">
                <el-select v-model="addForm.FrontRearSeatsHeated" placeholder="请输入前/后排座椅加热" clearable :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in Options_s"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

        </el-card>

        <el-card class="topNews">
          <el-row class="steps">
            <div class="dialog-footer">
              <el-button @click="close">取 消</el-button>
              <el-button type="primary" @click="OK">确 定</el-button>
            </div>
          </el-row>
        </el-card>
      </el-form></el-main>
  </el-container>
</template>

<script>
import {
// updateTabGoodsExtension
} from '@/api/goods'
export default {
  data() {
    return {
      addForm: {
        ShoppingTime: '',
        AdditionalConfiguration_s: []
      },
      rules: {

      },
      props: { multiple: true },
      ColorOptions: [{ 'label': '黑色', 'value': '黑色' }, { 'label': '白色', 'value': '白色' }, { 'label': '银灰色', 'value': '银灰色' }, { 'label': '深灰色', 'value': '深灰色' }, { 'label': '红色', 'value': '红色' }, {
        'label': '橙色', 'value': '橙色' }, { 'label': '绿色', 'value': '绿色' }, { 'label': '蓝色', 'value': '蓝色' }, { 'label': '咖啡色', 'value': '咖啡色' }, { 'label': '紫色', 'value': '紫色' }, {
        'label': '香槟色', 'value': '香槟色' }, { 'label': '多彩色', 'value': '多彩色' }, { 'label': '黄色', 'value': '黄色' }, { 'label': '其他', 'value': '其他' }],
      Options: [{ 'label': '标配', 'value': '标配' }, { 'label': '无', 'value': '无' }],
      Options_s: [{ 'label': '标配/标配', 'value': '标配/标配' }, { 'label': '标配/无', 'value': '标配/无' }, { 'label': '无/无', 'value': '无/无' }],
      AirConditionerOptions: [{ 'label': '自动', 'value': '自动' }, { 'label': '手动', 'value': '手动' }],
      ShoppingTimeYearsOptions: [{ 'label': '2020', 'value': 2020 }, { 'label': '2019', 'value': 2019 }, { 'label': '2018', 'value': 2018 }, { 'label': '2017', 'value': 2017 }, { 'label': '2016', 'value': 2016 }, { 'label': '2015', 'value': 2015 }, { 'label': '2014', 'value': 2014 }, { 'label': '2013', 'value': 2013 }, { 'label': '2012', 'value': 2012 }, { 'label': '2011', 'value': 2011 }, { 'label': '2010', 'value': 2010 }, { 'label': '2009', 'value': 2009 }, { 'label': '2008', 'value': 2008 }, { 'label': '2007', 'value': 2007 }, { 'label': '2006', 'value': 2006 }, { 'label': '2005', 'value': 2005 }, { 'label': '2004', 'value': 2004 }, { 'value': 2003 }],
      ShoppingTimeMonthOptions: [{ 'label': '一月', 'value': '01' }, { 'label': '二月', 'value': '02' }, { 'label': '三月', 'value': '03' }, { 'label': '四月', 'value': '04' }, { 'label': '五月', 'value': '05' }, { 'label': '六月', 'value': '06' }, { 'label': '七月', 'value': '07' }, { 'label': '八月', 'value': '08' }, { 'label': '九月', 'value': '09' }, { 'label': '十月', 'value': 10 }, { 'label': '十一月', 'value': 11 }, { 'label': '十二月', 'value': 12 }],
      DriveDistanceOptions: [{ 'label': '一万', 'value': 1 }, { 'label': '二万', 'value': 2 }, { 'label': '三万', 'value': 3 }, { 'label': '四万', 'value': 4 }, { 'label': '五万', 'value': 5 }, { 'label': '六万', 'value': 6 }, { 'label': '七万', 'value': 7 }, { 'label': '八万', 'value': 8 }, { 'label': '九万', 'value': 9 }, { 'label': '十万', 'value': 10 }, { 'label': '十一万', 'value': 11 }, { 'label': '十二万', 'value': 12 }, { 'label': '十三万', 'value': 13 }, { 'label': '十四万', 'value': 14 }, { 'label': '十五万', 'value': 15 }, { 'label': '十五万以上', 'value': 16 }],
      TransmissionOptions: [{ 'label': '手动挡', 'value': 0 }, { 'label': '自动挡', 'value': 1 }],
      ChangeNumberOptions: [{ 'label': '1', 'value': 1 }, { 'label': '2', 'value': 2 }, { 'label': '3', 'value': 3 }, { 'label': '4', 'value': 4 }, { 'label': '5', 'value': 5 }],
      EmissionStandardsOptions: [{ 'label': '国四', 'value': 0 }, { 'label': '国五', 'value': 1 }, { 'label': '国六', 'value': 2 }],
      CountryOptions: [{ 'label': '法系', 'value': 0 }, { 'label': '美系', 'value': 1 }, { 'label': '国产', 'value': 2 }, { 'label': '德系', 'value': 3 }, { 'label': '日系', 'value': 4 }, { 'label': '韩系', 'value': 5 }, { 'label': '其他', 'value': 6 }],
      EnergyTypeOptions: [{ 'label': '汽油', 'value': 0 }, { 'label': '柴油', 'value': 1 }, { 'label': '电动', 'value': 2 }, { 'label': '油电混合', 'value': 3 }, { 'label': '其他', 'value': 4 }],
      SeatOptions: [{ 'label': '两座', 'value': 0 }, { 'label': '四座', 'value': 1 }, { 'label': '五座', 'value': 2 }, { 'label': '六座', 'value': 3 }, { 'label': '七座及以上', 'value': 4 }],
      AdditionalConfigurationOptions: [{ 'label': '全景天窗', 'value': 0 }, { 'label': '车身稳定控制', 'value': 1 }, { 'label': '倒车影像系统', 'value': 2 }, { 'label': '真皮座椅', 'value': 3 }, { 'label': '无钥匙进入系统', 'value': 4 }, { 'label': '儿童座椅接口', 'value': 5 }, { 'label': '倒车雷达', 'value': 6 }, { 'label': 'GPS导航', 'value': 7 }],
      DriveTypeOptions: [{ 'label': '前轮驱动', 'value': 0 }, { 'label': '后轮驱动', 'value': 1 }, { 'label': '四驱驱动', 'value': 2 }],
      AirIntakeTypeOptions: [{ 'label': '机械增压', 'value': 0 }, { 'label': '自然吸气', 'value': 1 }, { 'label': '涡轮增压', 'value': 2 }, { 'label': '双涡轮增压', 'value': 3 }, { 'label': '机械+涡轮增压', 'value': 4 }, { 'label': '四涡轮增压', 'value': 5 }],
      BodyTypeOptions: [{ 'label': '承载式', 'value': 0 }, { 'label': '非承载式', 'value': 1 }]
    }
  },
  created() {
  },
  methods: {
    OK() {
      // console.log(this.addForm.AdditionalConfiguration_s)
      this.addForm.GoodsID = 229
      this.addForm.ShoppingTime = this.addForm.ShoppingTimeYears + this.addForm.ShoppingTimeMonth
      this.addForm.AdditionalConfiguration = this.addForm.AdditionalConfiguration_s.join('|')
      // console.log(this.addForm.AdditionalConfiguration)
      // updateTabGoodsExtension(this.addForm).then((res) => {
      //   if (res.data.success) {
      //     this.$message({
      //       type: 'success',
      //       message: '修改成功'
      //     })
      //     this.close()
      //   } else {
      //     this.$message({
      //       type: 'error',
      //       message: '修改失败'
      //     })
      //   }
      // })
    },
    goBack() { // 返回上一个界面
      this.$router.go(-1)
    },
    close() {
      this.$router.push({ path: '/contract/contract.html' })
    }
  }
}
</script>

<style scoped>
.block {
  display: inline-block;
}
.block .el-form-item {
  display: inline-block
}
.el-form-item .EndTime .is-required .el-form-item--medium .el-form-item__content {
  margin-left: 1px;
}
.newsDetail {
  display: inline-block;
  width: 400px;
  line-height: 45px;
}
.slot {
  display: inline-block;
  margin-left: 20px;
}

.button {
  /* float:right; */
  margin-right: 0px;
  width: 300px;
  display: inline-block;
  text-align: center;
  line-height: 45px;
}

.topNews {
  justify-content:space-between;
  margin-bottom: 40px;
  display: flex;
}
.baseNews {
  margin-bottom: 40px;
}.el-form-item__label
/* .baseNews label {
  font-weight: 400 !important;
} */
.row-bg {
  margin-bottom: 25px;
}
.el-form-item__label:after {
        content: "";
        display: inline-block;
        width: 100%;
    }

    .el-form-item__label {
        text-align: justify;
        height: 50px;
    }

    .el-form-item.is-required .el-form-item__label:before {
        content: none !important;
    }
    .el-input--suffix .el-input__inner {
    padding-right: 18px !important;
}
</style>
