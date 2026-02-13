import React, { useState, useMemo } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { motion } from "framer-motion";
import { Droplets, FlaskConical, Calculator, Sparkles, TrendingUp } from "lucide-react";

// ألوان أيقونات متناسقة وثلاثية الأبعاد باستخدام تأثير ظل وgradient
const iconStyle = {
  filter: "drop-shadow(2px 4px 4px rgba(0,0,0,0.25))",
  background: "linear-gradient(145deg, #FFD27F, #FFB347)",
  borderRadius: "8px",
  padding: "6px",
  color: "#333",
};

const labelStyle = {
  fontWeight: "bold",
  marginBottom: "0.5rem",
  display: "block",
  color: "#333",
};

export default function PerfumeCalculatorSite() {
  const [volume, setVolume] = useState(10);
  const [type, setType] = useState("parfum");
  const [compareType, setCompareType] = useState("eau_de_parfum");

  const [oilCostPerMl, setOilCostPerMl] = useState(0);
  const [alcoholCostPerMl, setAlcoholCostPerMl] = useState(0);
  const [bottleCost, setBottleCost] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [oilMultiplier, setOilMultiplier] = useState(0);

  const concentrations = { parfum: 0.40, eau_de_parfum: 0.35, eau_de_toilette: 0.20, eau_de_cologne: 0.15};

  const concentration = concentrations[type];
  const compareConcentration = concentrations[compareType];

  const result = useMemo(() => {
    const oilValue = volume * concentration;
    const alcoholValue = volume - oilValue;
    return { oil: oilValue.toFixed(2), alcohol: alcoholValue.toFixed(2), oilNumeric: oilValue, alcoholNumeric: alcoholValue, oilRatio: volume > 0 ? oilValue / volume : 0 };
  }, [volume, concentration]);

  const compareResult = useMemo(() => {
    const oilValue = volume * compareConcentration;
    return { oilRatio: volume > 0 ? oilValue / volume : 0 };
  }, [volume, compareConcentration]);

  const financials = useMemo(() => {
    const oilCost = result.oilNumeric * oilCostPerMl;
    const alcoholCost = result.alcoholNumeric * alcoholCostPerMl;
    const totalCost = oilCost + alcoholCost + Number(bottleCost || 0);
    const profit = Number(sellingPrice || 0) - totalCost;
    return { totalCost: totalCost.toFixed(2), profit: profit.toFixed(2) };
  }, [result, oilCostPerMl, alcoholCostPerMl, bottleCost, sellingPrice]);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{
      backgroundImage: 'url(https://manforhimself.com/wp-content/uploads/2025/06/Summer-Signature-Scent-Man-For-Himself-Mens-Fragrance-Quiz-ft.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="relative h-[380px] w-full">
        <div className="absolute inset-0 bg-black/25" />
        {[...Array(12)].map((_, i) => (
          <motion.div key={i} initial={{ y: 50, opacity: 0 }} animate={{ y: -200, opacity: [0, 0.6, 0] }} transition={{ duration: 6 + i, repeat: Infinity, delay: i * 0.4 }} className="absolute w-3 h-3 bg-amber-200/60 rounded-full blur-sm" style={{ left: `${Math.random() * 100}%`, bottom: -20 }} />
        ))}

        <div className="absolute inset-0 flex items-center justify-center text-center p-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-white max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 flex items-center justify-center gap-2">
              <Sparkles style={iconStyle} className="w-6 h-6" />
              حاسبة تجارة العطور الاحترافية من بيت العود والعطور الفاخرة
</h1>
            <p className="text-base md:text-lg opacity-95">تعلم تركيبة العطر خلال ثوانٍ وابدأ البيع بثقة.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 -mt-16">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="rounded-2xl shadow-2xl backdrop-blur bg-white/95 border border-amber-100">
            <CardContent className="p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-2 text-xl font-semibold">
                <Calculator style={iconStyle} className="w-5 h-5" />
                حساب تركيبة العطر
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">حجم القارورة (مل)</label>
                  <Input type="number" value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">تركيز العطر</label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="parfum">Parfum</SelectItem>
                      <SelectItem value="eau_de_parfum">EDP</SelectItem>
                      <SelectItem value="eau_de_toilette">EDT</SelectItem>
                      <SelectItem value="eau_de_cologne">EDC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-4">
                <motion.div whileHover={{ scale: 1.03 }}>
                  <Card className="rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50">
                    <CardContent className="p-5 flex items-center gap-3">
                      <Droplets style={iconStyle} className="w-6 h-6" />
                      <div>
                        <p className="text-sm opacity-70">الزيت</p>
                        <p className="text-xl font-semibold">{result.oil} مل</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ scale: 1.03 }}>
                  <Card className="rounded-2xl bg-gradient-to-br from-rose-100 to-rose-50">
                    <CardContent className="p-5 flex items-center gap-3">
                      <FlaskConical style={iconStyle} className="w-6 h-6" />
                      <div>
                        <p className="text-sm opacity-70">الكحول</p>
                        <p className="text-xl font-semibold">{result.alcohol} مل</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <div className="pt-6 space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <TrendingUp style={iconStyle} className="w-5 h-5" />
                  حساب التكاليف والربح
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    type="number"
                    placeholder="سعر الزيت / مل"
                    onChange={(e) => setOilCostPerMl(Number(e.target.value))}
                  />
                  <Input
                    type="number"
                    placeholder="سعر الكحول / مل"
                    onChange={(e) => setAlcoholCostPerMl(Number(e.target.value))}
                  />
                  <Input
                    type="number"
                    placeholder="تكلفة القارورة"
                    onChange={(e) => setBottleCost(Number(e.target.value))}
                  />
                  <Input
                    type="number"
                    placeholder="سعر البيع"
                    onChange={(e) => setSellingPrice(Number(e.target.value))}
                  />
                  <Input
                    type="number"
                    placeholder="مضاعف الزيت (*2، *3 ...)"
                    onChange={(e) => setOilMultiplier(Number(e.target.value))}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="rounded-xl bg-amber-50">
                    <CardContent className="p-4">
                      <p className="text-sm opacity-70">التكلفة</p>
                      <p className="text-xl font-semibold">
                        {financials.totalCost}
                      </p>
                    </CardContent>
                  </Card>

                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Card className="rounded-xl bg-emerald-50">
                      <CardContent className="p-4">
                        <p className="text-sm opacity-70">الربح</p>
                        <p className="text-xl font-semibold">
                          {financials.profit}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>

              <div className="pt-6 flex flex-col items-center gap-4">
                <h3 className="font-semibold text-lg">نسبة الزيت داخل القارورة</h3>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-4 bg-gray-700 rounded-t-md" />
                  <div className="relative w-28 h-56 border-2 border-gray-400 rounded-b-2xl overflow-hidden bg-white shadow-inner">
                    <div className="absolute inset-0 bg-gray-100" />
                    <motion.div key={result.oilRatio} initial={{ height: 0 }} animate={{ height: `${result.oilRatio * 100}%` }} transition={{ duration: 0.6 }} className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-amber-400 to-amber-200" />
                  </div>
                </div>
              </div>

              <div className="pt-8 space-y-4">
                <h3 className="font-semibold text-lg text-center">مقارنة تركيزين</h3>
                <Select value={compareType} onValueChange={setCompareType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="parfum">Parfum</SelectItem>
                    <SelectItem value="eau_de_parfum">EDP</SelectItem>
                    <SelectItem value="eau_de_toilette">EDT</SelectItem>
                    <SelectItem value="eau_de_cologne">EDC</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex justify-center gap-10">
                  {[result.oilRatio, compareResult.oilRatio].map((ratio, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-14 h-4 bg-gray-700 rounded-t-md" />
                      <div className="relative w-20 h-44 border-2 border-gray-400 rounded-b-2xl overflow-hidden bg-white">
                        <div className="absolute inset-0 bg-gray-100" />
                        <div className="absolute bottom-0 left-0 w-full bg-amber-300" style={{ height: `${ratio * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}