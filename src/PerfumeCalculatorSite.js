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
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: '#1a1a2e' }}>
      {/* Fixed background that adapts to mobile/desktop */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url(https://manforhimself.com/wp-content/uploads/2025/06/Summer-Signature-Scent-Man-For-Himself-Mens-Fragrance-Quiz-ft.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        zIndex: 0,
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
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

      <div className="max-w-4xl mx-auto p-6 mt-6">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="rounded-2xl shadow-2xl border border-white/20" style={{ background: "rgba(255,255,255,0.78)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)" }}>
            <CardContent className="p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-2 text-xl font-semibold">
                <Calculator style={iconStyle} className="w-5 h-5" />
                حساب تركيبة العطر
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Volume Input Card */}
                <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                  <div style={{
                    background: "rgba(255, 248, 231, 0.47)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    borderRadius: "16px",
                    padding: "20px",
                    border: "1px solid rgba(245, 222, 179, 0.4)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6)",
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
                    background: "rgba(243, 232, 255, 0.45)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    borderRadius: "16px",
                    padding: "20px",
                    border: "1px solid rgba(216, 196, 240, 0.4)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6)",
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

              <div className="grid md:grid-cols-2 gap-5 pt-4">
                <motion.div
                  whileHover={{ scale: 1.04, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div style={{
                    background: "rgba(255, 237, 196, 0.35)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    borderRadius: "20px",
                    padding: "24px",
                    border: "1px solid rgba(255, 200, 100, 0.35)",
                    boxShadow: "0 8px 32px rgba(255, 180, 50, 0.15), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.7)",
                    position: "relative",
                    overflow: "hidden",
                  }}>
                    <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "80px", height: "80px", background: "radial-gradient(circle, rgba(255,200,50,0.2), transparent 70%)", borderRadius: "50%" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: "14px", position: "relative" }}>
                      <div style={{
                        background: "linear-gradient(145deg, #FFD54F, #FFB300)",
                        borderRadius: "14px",
                        padding: "12px",
                        boxShadow: "0 4px 12px rgba(255, 179, 0, 0.35)",
                      }}>
                        <Droplets style={{ width: "24px", height: "24px", color: "#fff" }} />
                      </div>
                      <div>
                        <p style={{ fontSize: "13px", color: "#8D6E63", fontWeight: "500", margin: 0 }}>كمية الزيت المطلوبة</p>
                        <p style={{ fontSize: "28px", fontWeight: "800", color: "#3E2723", margin: "2px 0 0 0", letterSpacing: "-0.5px" }}>{result.oil} <span style={{ fontSize: "16px", fontWeight: "600", color: "#8D6E63" }}>مل</span></p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.04, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div style={{
                    background: "rgba(255, 228, 230, 0.35)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    borderRadius: "20px",
                    padding: "24px",
                    border: "1px solid rgba(244, 143, 177, 0.35)",
                    boxShadow: "0 8px 32px rgba(244, 143, 177, 0.15), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.7)",
                    position: "relative",
                    overflow: "hidden",
                  }}>
                    <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "80px", height: "80px", background: "radial-gradient(circle, rgba(244,143,177,0.2), transparent 70%)", borderRadius: "50%" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: "14px", position: "relative" }}>
                      <div style={{
                        background: "linear-gradient(145deg, #F48FB1, #E91E63)",
                        borderRadius: "14px",
                        padding: "12px",
                        boxShadow: "0 4px 12px rgba(233, 30, 99, 0.3)",
                      }}>
                        <FlaskConical style={{ width: "24px", height: "24px", color: "#fff" }} />
                      </div>
                      <div>
                        <p style={{ fontSize: "13px", color: "#AD1457", fontWeight: "500", margin: 0 }}>كمية الكحول المطلوبة</p>
                        <p style={{ fontSize: "28px", fontWeight: "800", color: "#880E4F", margin: "2px 0 0 0", letterSpacing: "-0.5px" }}>{result.alcohol} <span style={{ fontSize: "16px", fontWeight: "600", color: "#AD1457" }}>مل</span></p>
                      </div>
                    </div>
                  </div>
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
                      background: "rgba(250, 250, 250, 0.4)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      borderRadius: "12px",
                      padding: "14px",
                      border: "1px solid rgba(224, 224, 224, 0.4)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)",
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

                <div className="grid md:grid-cols-2 gap-5">
                  <motion.div
                    whileHover={{ scale: 1.04, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div style={{
                      background: "rgba(255, 243, 224, 0.4)",
                      backdropFilter: "blur(14px)",
                      WebkitBackdropFilter: "blur(14px)",
                      borderRadius: "20px",
                      padding: "24px",
                      border: "1px solid rgba(255, 183, 77, 0.3)",
                      boxShadow: "0 8px 32px rgba(255, 152, 0, 0.12), 0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.7)",
                      position: "relative",
                      overflow: "hidden",
                    }}>
                      <div style={{ position: "absolute", top: "-15px", right: "-15px", width: "60px", height: "60px", background: "radial-gradient(circle, rgba(255,152,0,0.15), transparent 70%)", borderRadius: "50%" }} />
                      <div style={{ position: "relative" }}>
                        <p style={{ fontSize: "13px", color: "#E65100", fontWeight: "600", margin: "0 0 4px 0" }}>📊 إجمالي التكلفة</p>
                        <p style={{ fontSize: "30px", fontWeight: "800", color: "#BF360C", margin: 0, letterSpacing: "-0.5px" }}>{financials.totalCost} <span style={{ fontSize: "14px", fontWeight: "600", color: "#E65100" }}>د.ج</span></p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.04, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div style={{
                      background: "rgba(232, 245, 233, 0.4)",
                      backdropFilter: "blur(14px)",
                      WebkitBackdropFilter: "blur(14px)",
                      borderRadius: "20px",
                      padding: "24px",
                      border: "1px solid rgba(76, 175, 80, 0.3)",
                      boxShadow: "0 8px 32px rgba(76, 175, 80, 0.15), 0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.7)",
                      position: "relative",
                      overflow: "hidden",
                    }}>
                      <div style={{ position: "absolute", top: "-15px", right: "-15px", width: "60px", height: "60px", background: "radial-gradient(circle, rgba(76,175,80,0.15), transparent 70%)", borderRadius: "50%" }} />
                      <div style={{ position: "relative" }}>
                        <p style={{ fontSize: "13px", color: "#2E7D32", fontWeight: "600", margin: "0 0 4px 0" }}>💰 صافي الربح</p>
                        <p style={{ fontSize: "30px", fontWeight: "800", color: "#1B5E20", margin: 0, letterSpacing: "-0.5px" }}>{financials.profit} <span style={{ fontSize: "14px", fontWeight: "600", color: "#2E7D32" }}>د.ج</span></p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      </div>
    </div>
  );
}