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



export default function PerfumeCalculatorSite() {
  const [volume, setVolume] = useState(10);
  const [type, setType] = useState("parfum");
  const [compareType, setCompareType] = useState("eau_de_parfum");

  const [oilCostPerMl, setOilCostPerMl] = useState(0);
  const [alcoholCostPerMl, setAlcoholCostPerMl] = useState(0);
  const [bottleCost, setBottleCost] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);


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
                {/* Volume Input Card */}
                <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                  <div style={{
                    background: "linear-gradient(135deg, #FFF8E7, #FFF1D6)",
                    borderRadius: "16px",
                    padding: "20px",
                    border: "1px solid #F5DEB3",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                      <div style={{
                        background: "linear-gradient(145deg, #FFD27F, #FFB347)",
                        borderRadius: "10px",
                        padding: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        filter: "drop-shadow(1px 2px 3px rgba(0,0,0,0.15))",
                      }}>
                        <FlaskConical style={{ width: "20px", height: "20px", color: "#5D4037" }} />
                      </div>
                      <div>
                        <p style={{ fontWeight: "700", fontSize: "15px", color: "#3E2723", margin: 0 }}>حجم القارورة</p>
                        <p style={{ fontSize: "12px", color: "#8D6E63", margin: 0 }}>أدخل حجم القارورة التي بين يديك</p>
                      </div>
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      background: "#fff",
                      borderRadius: "12px",
                      border: "2px solid #E8D5B7",
                      overflow: "hidden",
                      transition: "border-color 0.2s",
                    }}>
                      <input
                        type="number"
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        style={{
                          flex: 1,
                          border: "none",
                          outline: "none",
                          padding: "14px 16px",
                          fontSize: "22px",
                          fontWeight: "700",
                          color: "#3E2723",
                          background: "transparent",
                          textAlign: "center",
                          width: "100%",
                        }}
                      />
                      <span style={{
                        padding: "14px 18px",
                        background: "linear-gradient(145deg, #FFE8C2, #FFD896)",
                        fontWeight: "700",
                        fontSize: "16px",
                        color: "#6D4C41",
                        borderRight: "2px solid #E8D5B7",
                        whiteSpace: "nowrap",
                      }}>مل (ml)</span>
                    </div>
                    <p style={{ fontSize: "11px", color: "#A1887F", marginTop: "8px", textAlign: "center" }}>
                      مثال: 10 مل، 50 مل، 100 مل
                    </p>
                  </div>
                </motion.div>

                {/* Concentration Select Card */}
                <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                  <div style={{
                    background: "linear-gradient(135deg, #F3E8FF, #EDE0FF)",
                    borderRadius: "16px",
                    padding: "20px",
                    border: "1px solid #D8C4F0",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                      <div style={{
                        background: "linear-gradient(145deg, #CE93D8, #AB47BC)",
                        borderRadius: "10px",
                        padding: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        filter: "drop-shadow(1px 2px 3px rgba(0,0,0,0.15))",
                      }}>
                        <Droplets style={{ width: "20px", height: "20px", color: "#fff" }} />
                      </div>
                      <div>
                        <p style={{ fontWeight: "700", fontSize: "15px", color: "#4A148C", margin: 0 }}>نوع التركيز</p>
                        <p style={{ fontSize: "12px", color: "#7B1FA2", margin: 0 }}>اختر درجة تركيز العطر</p>
                      </div>
                    </div>
                    <Select value={type} onValueChange={setType}>
                      <SelectTrigger style={{
                        background: "#fff",
                        borderRadius: "12px",
                        border: "2px solid #D1B3E8",
                        padding: "14px 16px",
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#4A148C",
                      }}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="parfum">💎 Parfum (تركيز عالي 40%)</SelectItem>
                        <SelectItem value="eau_de_parfum">✨ EDP (تركيز 35%)</SelectItem>
                        <SelectItem value="eau_de_toilette">🌸 EDT (تركيز 20%)</SelectItem>
                        <SelectItem value="eau_de_cologne">🍃 EDC (تركيز 15%)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p style={{ fontSize: "11px", color: "#9575CD", marginTop: "8px", textAlign: "center" }}>
                      كلما زاد التركيز، زادت نسبة الزيت في التركيبة
                    </p>
                  </div>
                </motion.div>
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

              <div className="pt-6 space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <TrendingUp style={iconStyle} className="w-5 h-5" />
                  حساب التكاليف والربح
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { label: "💧 سعر الزيت / مل", hint: "كم يكلفك 1 مل من الزيت؟", setter: setOilCostPerMl },
                    { label: "🧪 سعر الكحول / مل", hint: "كم يكلفك 1 مل من الكحول؟", setter: setAlcoholCostPerMl },
                    { label: "🫙 تكلفة القارورة الفارغة", hint: "سعر القارورة + الغطاء", setter: setBottleCost },
                    { label: "💰 سعر البيع النهائي", hint: "بكم ستبيع العطر؟", setter: setSellingPrice },
                  ].map((item, i) => (
                    <div key={i} style={{
                      background: "#FAFAFA",
                      borderRadius: "12px",
                      padding: "14px",
                      border: "1px solid #E0E0E0",
                    }}>
                      <p style={{ fontWeight: "600", fontSize: "14px", color: "#333", margin: "0 0 2px 0" }}>{item.label}</p>
                      <p style={{ fontSize: "11px", color: "#999", margin: "0 0 8px 0" }}>{item.hint}</p>
                      <input
                        type="number"
                        placeholder="0"
                        onChange={(e) => item.setter(Number(e.target.value))}
                        style={{
                          width: "100%",
                          border: "2px solid #E0E0E0",
                          borderRadius: "10px",
                          padding: "12px 14px",
                          fontSize: "18px",
                          fontWeight: "600",
                          color: "#333",
                          outline: "none",
                          background: "#fff",
                          textAlign: "center",
                          transition: "border-color 0.2s",
                        }}
                      />
                    </div>
                  ))}
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
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}